import { useConversationHistory } from "@/providers/Conversation/ConversationProvider";
import getErrorMessage from "@/utils/getErrorMessage";

export default function HistoryLoader() {
	const { loaded, loading, load, error } = useConversationHistory();

	return (
		<div className="shrink-0 px-4 pt-2 text-center text-xs text-subtle">
			{loading ? (
				<span>Загружаем историю…</span>
			) : loaded ? (
				<span>История загружена</span>
			) : (
				<button
					className="rounded-lg border-0 bg-transparent px-2 py-1 text-accent enabled:hover:bg-accent-soft"
					type="button"
					onClick={load}
				>
					Повторить загрузку истории
				</button>
			)}

			{!!error && (
				<p className="my-1 text-error">
					{getErrorMessage(
						error,
						"Не удалось загрузить историю. Попробуйте снова"
					)}
				</p>
			)}
		</div>
	);
}
