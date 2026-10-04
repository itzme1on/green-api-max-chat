import ChatIcon from "#/Icons/ChatIcon";
import { useChatSearch } from "@/providers/ChatList/ChatListProvider";

export default function ChatListEmpty() {
	const search = useChatSearch();

	return (
		<div className="mx-4 my-16 flex flex-col items-center text-center text-subtle">
			<ChatIcon size={30} />

			<h2 className="mt-4 mb-2 text-sm font-medium text-muted">
				{search ? "Ничего не найдено" : "Здесь будут ваши чаты"}
			</h2>

			<p className="max-w-52 text-xs leading-relaxed text-subtle">
				{search
					? "Попробуйте другое имя или номер"
					: "Добавьте номер телефона, чтобы начать общение"}
			</p>
		</div>
	);
}
