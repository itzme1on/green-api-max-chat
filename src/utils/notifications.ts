import type { Chat } from "@/types/Chat";
import type { ChatState } from "@/types/ChatState";
import { formatPhone } from "@/utils/phone";

function getRecord(value: unknown): Record<string, unknown> {
	return value && typeof value === "object"
		? (value as Record<string, unknown>)
		: {};
}

function applyIncomingMessage(
	state: ChatState,
	body: Record<string, unknown>,
	activeId: string | null
): ChatState {
	if (body.typeWebhook !== "incomingMessageReceived") return state;

	const sender = getRecord(body.senderData);
	const data = getRecord(body.messageData);

	const text =
		data.typeMessage === "textMessage"
			? getRecord(data.textMessageData).textMessage
			: data.typeMessage === "extendedTextMessage"
				? getRecord(data.extendedTextMessageData).text
				: undefined;

	if (
		typeof text !== "string" ||
		typeof sender.chatId !== "string" ||
		typeof body.idMessage !== "string" ||
		typeof body.timestamp !== "number"
	) {
		return state;
	}

	if (sender.chatType === "group" || sender.chatId.startsWith("-")) {
		return state;
	}

	let chat = state.chats.find((item) => item.id === sender.chatId);

	if (chat?.messages.some((message) => message.id === body.idMessage)) {
		return state;
	}

	if (!chat) {
		const phone = sender.senderPhoneNumber
			? String(sender.senderPhoneNumber)
			: undefined;

		const name =
			sender.senderContactName || sender.senderName || sender.chatName;

		chat = {
			id: sender.chatId,
			phone,
			name:
				typeof name === "string" && name
					? name
					: phone
						? formatPhone(phone)
						: `Чат ${sender.chatId}`,
			unread: 0,
			messages: [],
		};
	}

	const updated: Chat = {
		...chat,
		unread: chat.id === activeId ? 0 : chat.unread + 1,
		messages: [
			...chat.messages,
			{
				id: body.idMessage,
				text,
				timestamp: body.timestamp * 1000,
				direction: "incoming" as const,
			},
		].sort(
			// время приходит с точностью до секунды, поэтому сравниваем по секундам
			(a, b) =>
				Math.floor(a.timestamp / 1000) - Math.floor(b.timestamp / 1000)
		),
	};

	return {
		...state,
		chats: state.chats.some((item) => item.id === chat.id)
			? state.chats.map((item) => (item.id === chat.id ? updated : item))
			: [updated, ...state.chats],
	};
}

export function applyNotification(
	state: ChatState,
	body: Record<string, unknown>,
	activeId: string | null
): ChatState {
	if (body.typeWebhook === "incomingMessageReceived") {
		return applyIncomingMessage(state, body, activeId);
	}

	return state;
}
