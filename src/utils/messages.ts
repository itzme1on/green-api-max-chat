import type { HistoryMessage } from "@/types/HistoryMessage";
import type { Message } from "@/types/Message";

export function mergeHistory(
	history: HistoryMessage[],
	current: Message[]
): Message[] {
	const byId = new Map<string, Message>();

	for (const item of history.toReversed()) {
		const isText =
			item.typeMessage === "textMessage" ||
			item.typeMessage === "extendedTextMessage";

		if (!isText || !item.textMessage) continue;

		byId.set(item.idMessage, {
			id: item.idMessage,
			text: item.textMessage,
			timestamp: item.timestamp * 1000,
			direction: item.type,
		});
	}

	for (const item of current) byId.set(item.id, item);

	return [...byId.values()].sort(
		(a, b) => Math.floor(a.timestamp / 1000) - Math.floor(b.timestamp / 1000)
	);
}
