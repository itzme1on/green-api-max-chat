import Avatar from "#/Elements/Avatar/Avatar";
import { useConversationChat } from "@/providers/Conversation/ConversationProvider";

export default function MessagesEmpty() {
	const chat = useConversationChat();

	return (
		<div className="flex h-full flex-col items-center justify-center text-center gap-4">
			<Avatar name={chat.name} large />

			<h3 className="text-xl font-semibold text-muted">Начните разговор</h3>

			<p className="text-sm text-subtle">Напишите первое сообщение</p>
		</div>
	);
}
