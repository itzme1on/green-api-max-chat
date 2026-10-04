import Avatar from "#/Elements/Avatar/Avatar";
import IconButton from "#/Elements/IconButton/IconButton";
import BackIcon from "#/Icons/BackIcon";
import { useConversationChat } from "@/providers/Conversation/ConversationProvider";
import { useSelectChat } from "@/providers/CurrentChat/CurrentChatProvider";
import { formatPhone } from "@/utils/phone";

export default function ConversationHeader() {
	const chat = useConversationChat();
	const select = useSelectChat();

	const phone =
		chat.phone && chat.name !== formatPhone(chat.phone)
			? `${formatPhone(chat.phone)}`
			: "";

	return (
		<header className="flex h-21 shrink-0 items-center gap-3 border-b border-stroke bg-white px-8 py-4 max-[900px]:px-5 max-sm:h-19 max-sm:gap-2 max-sm:px-4 max-sm:py-3">
			<IconButton
				label="Назад к чатам"
				className="-ml-2 sm:hidden"
				onClick={() => select(null)}
			>
				<BackIcon size={22} />
			</IconButton>

			<Avatar name={chat.name} />

			<div className="min-w-0">
				<h2 className="truncate text-sm font-semibold">{chat.name}</h2>

				<p className="mt-1 text-xs text-subtle">{phone}</p>
			</div>
		</header>
	);
}
