import useMessageScroll from "@/hooks/message-scroll/useMessageScroll";
import {
	useConversationComposer,
	useConversationMessages,
} from "@/providers/Conversation/ConversationProvider";
import type { Message } from "@/types/Message";
import MessageItem from "../MessageItem/MessageItem";
import MessageDateDivider from "./MessageDateDivider";
import MessagesEmpty from "./MessagesEmpty";

const isSameDay = (a: Message, b?: Message) => {
	if (!b) return false;

	return (
		new Date(a.timestamp).toDateString() ===
		new Date(b.timestamp).toDateString()
	);
};

export default function MessagesList() {
	const messages = useConversationMessages();

	const { scrollVersion } = useConversationComposer();
	const { list, handleScroll } = useMessageScroll(messages, scrollVersion);

	return (
		<div
			className="min-h-0 flex-1 overflow-y-auto px-8 py-6 max-[900px]:p-4 max-sm:px-3"
			ref={list}
			onScroll={handleScroll}
		>
			{messages.length ? (
				<div className="mx-auto max-w-225">
					{messages.map((message, index) => (
						<div key={message.id} className="flow-root">
							{!isSameDay(message, messages[index - 1]) && (
								<MessageDateDivider timestamp={message.timestamp} />
							)}

							<MessageItem message={message} />
						</div>
					))}
				</div>
			) : (
				<MessagesEmpty />
			)}
		</div>
	);
}
