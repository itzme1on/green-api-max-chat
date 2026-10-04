import type { Chat } from "@/types/Chat";
import type { ChatState } from "@/types/ChatState";
import type { Message } from "@/types/Message";
import type { RemoteChat } from "@/types/RemoteChat";
import { formatPhone } from "@/utils/phone";

export const emptyState: ChatState = { chats: [] };

export function openChat(
	state: ChatState,
	id: string,
	phone: string
): ChatState {
	const existing = state.chats.find((chat) => chat.id === id);

	if (existing) {
		return {
			...state,
			chats: state.chats.map((chat) =>
				chat.id === id ? { ...chat, phone, unread: 0 } : chat
			),
		};
	}

	return {
		...state,
		chats: [
			{ id, phone, name: formatPhone(phone), unread: 0, messages: [] },
			...state.chats,
		],
	};
}

export function mergeChats(state: ChatState, remote: RemoteChat[]): ChatState {
	const chats = new Map(state.chats.map((chat) => [chat.id, chat]));

	for (const item of remote) {
		if (item.type !== "user") continue;

		const current = chats.get(item.chatId);

		const phone = item.phoneNumber
			? String(item.phoneNumber)
			: current?.phone;

		chats.set(item.chatId, {
			id: item.chatId,
			name:
				item.name ||
				current?.name ||
				(phone ? formatPhone(phone) : `Чат ${item.chatId}`),
			phone,
			unread: current?.unread ?? item.unreadCount ?? 0,
			messages: current?.messages ?? [],
		});
	}

	return { ...state, chats: [...chats.values()] };
}

export function markRead(state: ChatState, id: string): ChatState {
	return {
		...state,
		chats: state.chats.map((chat) =>
			chat.id === id ? { ...chat, unread: 0 } : chat
		),
	};
}

export function addOutgoing(
	state: ChatState,
	chatId: string,
	message: Message
): ChatState {
	return {
		...state,
		chats: state.chats.map((chat) =>
			chat.id === chatId
				? { ...chat, messages: [...chat.messages, message] }
				: chat
		),
	};
}

export function finishOutgoing(
	state: ChatState,
	chatId: string,
	localId: string,
	result: { id?: string; error?: string }
): ChatState {
	return {
		...state,
		chats: state.chats.map((chat) =>
			chat.id === chatId
				? {
						...chat,
						messages: chat.messages.map((message) =>
							message.id === localId
								? {
										...message,
										id: result.id ?? localId,
										error: result.error,
									}
								: message
						),
					}
				: chat
		),
	};
}

export function getVisibleChats(chats: Chat[], search: string) {
	const query = search.toLowerCase();

	return chats
		.filter((chat) =>
			`${chat.name} ${chat.phone ?? ""}`.toLowerCase().includes(query)
		)
		.sort(
			(a, b) =>
				(b.messages.at(-1)?.timestamp ?? 0) -
				(a.messages.at(-1)?.timestamp ?? 0)
		);
}
