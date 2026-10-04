import ConversationHeader from "./ConversationHeader";
import HistoryLoader from "./HistoryLoader";
import MessageComposer from "./MessageComposer/MessageComposer";
import MessagesList from "./MessagesList/MessagesList";

export default function Conversation() {
	return (
		<section className="flex min-h-0 flex-1 flex-col">
			<ConversationHeader />

			<HistoryLoader />

			<MessagesList />

			<MessageComposer />
		</section>
	);
}
