import ConversationProvider from "@/providers/Conversation/ConversationProvider";
import { useCurrentChat } from "@/providers/CurrentChat/CurrentChatProvider";
import classNames from "classnames";
import ConnectionBanner from "./Connection/ConnectionBanner";
import Conversation from "./Conversation/Conversation";
import ChatWelcome from "./Welcome/ChatWelcome";

export default function ChatMain() {
	const chat = useCurrentChat();

	return (
		<div
			className={classNames(
				"flex min-w-0 flex-1 flex-col bg-chat-background max-sm:w-full",
				{
					"max-sm:flex": !!chat,
					"max-sm:hidden": !chat,
				}
			)}
		>
			<ConnectionBanner />

			{chat ? (
				<ConversationProvider key={chat.id} chat={chat}>
					<Conversation />
				</ConversationProvider>
			) : (
				<ChatWelcome />
			)}
		</div>
	);
}
