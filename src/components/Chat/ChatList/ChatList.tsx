import { useVisibleChats } from "@/providers/ChatList/ChatListProvider";
import { useChatsLoad } from "@/providers/Chats/ChatsProvider";
import ChatListEmpty from "./ChatListEmpty";
import ChatListItem from "./ChatListItem/ChatListItem";
import ChatListStatus from "./ChatListStatus";

export default function ChatList() {
	const chats = useVisibleChats();
	const { loading, error } = useChatsLoad();

	return (
		<div className="flex-1 overflow-y-auto px-2">
			<ChatListStatus />

			{chats.length ? (
				chats.map((chat) => <ChatListItem key={chat.id} chat={chat} />)
			) : !loading && !error ? (
				<ChatListEmpty />
			) : null}
		</div>
	);
}
