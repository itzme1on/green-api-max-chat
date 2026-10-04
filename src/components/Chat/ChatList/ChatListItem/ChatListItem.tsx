import Avatar from "#/Elements/Avatar/Avatar";
import {
	useCurrentChatId,
	useSelectChat,
} from "@/providers/CurrentChat/CurrentChatProvider";
import type { Chat } from "@/types/Chat";
import classNames from "classnames";

interface Props {
	chat: Chat;
}

export default function ChatListItem({ chat }: Props) {
	const activeId = useCurrentChatId();
	const select = useSelectChat();

	const selected = chat.id === activeId;

	return (
		<button
			className={classNames(
				"mb-1 flex w-full items-center gap-3 rounded-xl border-0 px-3 py-4 text-left",
				{
					"bg-accent-soft": selected,
					"bg-transparent hover:bg-accent-soft/50": !selected,
				}
			)}
			onClick={() => select(chat.id)}
		>
			<Avatar name={chat.name} />

			<strong className="min-w-0 flex-1 truncate text-sm font-semibold">
				{chat.name}
			</strong>

			{chat.unread > 0 && (
				<span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs text-white">
					{chat.unread}
				</span>
			)}
		</button>
	);
}
