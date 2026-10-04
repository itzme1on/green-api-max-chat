import Spinner from "#/Elements/Spinner/Spinner";
import { useChatsLoad } from "@/providers/Chats/ChatsProvider";
import getErrorMessage from "@/utils/getErrorMessage";

export default function ChatListStatus() {
	const { loading, error, load } = useChatsLoad();

	if (loading) {
		return (
			<p className="flex items-center justify-center gap-2 px-3 py-5 text-xs text-muted">
				<Spinner /> Загружаем чаты…
			</p>
		);
	}

	if (!error) return null;

	return (
		<div className="px-3 py-5 text-center text-xs">
			<p className="leading-normal text-error">
				{getErrorMessage(error, "Не удалось загрузить чаты")}
			</p>

			<button
				className="mt-3 rounded-lg bg-accent-soft px-3 py-2 text-accent"
				type="button"
				onClick={load}
			>
				Повторить загрузку чатов
			</button>
		</div>
	);
}
