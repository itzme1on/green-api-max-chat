import ChatList from "#/Chat/ChatList/ChatList";
import ChatSearch from "#/Chat/ChatList/ChatSearch";
import ConnectionStatus from "#/Chat/Connection/ConnectionStatus";
import NewChatButton from "#/Elements/NewChatButton/NewChatButton";
import ChatListProvider from "@/providers/ChatList/ChatListProvider";
import { useCurrentChatId } from "@/providers/CurrentChat/CurrentChatProvider";
import classNames from "classnames";

export default function ChatSidebar() {
	const activeId = useCurrentChatId();

	return (
		<ChatListProvider>
			<aside
				className={classNames(
					"flex w-85 shrink-0 flex-col border-r border-stroke max-[900px]:w-72 max-sm:w-full max-sm:border-0",
					{
						"max-sm:hidden": !!activeId,
					}
				)}
			>
				<div className="p-5">
					<ChatSearch />

					<NewChatButton />
				</div>

				<ChatList />

				<ConnectionStatus />
			</aside>
		</ChatListProvider>
	);
}
