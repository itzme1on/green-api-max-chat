import Spinner from "#/Elements/Spinner/Spinner";
import SendIcon from "#/Icons/SendIcon";
import { useConversationComposer } from "@/providers/Conversation/ConversationProvider";

export default function MessageComposer() {
	const { input, draft, error, loading, disabled, setDraft, submit } =
		useConversationComposer();

	return (
		<div className="border-t border-stroke bg-white px-7 pt-4 pb-5 max-[900px]:px-4 max-[900px]:pb-4 max-sm:px-3 max-sm:pt-3 max-sm:pb-3">
			{error && (
				<div className="pb-3 text-xs leading-normal text-error">
					{error}
				</div>
			)}

			<form
				className="flex items-end gap-2"
				onSubmit={(event) => {
					event.preventDefault();
					submit();
				}}
			>
				<textarea
					className="max-h-40 min-h-11 min-w-0 flex-1 resize-y rounded-xl border border-stroke bg-chat-background px-4 py-3 text-sm leading-snug focus:border-accent focus:ring-3 focus:ring-accent/10 focus:outline-none"
					ref={input}
					placeholder="Написать сообщение"
					rows={2}
					value={draft}
					maxLength={4000}
					disabled={loading || disabled}
					onChange={(event) => setDraft(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter" && !event.shiftKey) {
							event.preventDefault();
							submit();
						}
					}}
				/>

				<button
					className="flex size-11 shrink-0 items-center justify-center rounded-xl border-0 bg-accent text-white enabled:hover:bg-accent-hover"
					disabled={!draft.trim() || loading || disabled}
				>
					{loading ? <Spinner /> : <SendIcon size={20} />}
				</button>
			</form>

			<div className="mt-2 text-xs text-subtle">{draft.length} / 4000</div>
		</div>
	);
}
