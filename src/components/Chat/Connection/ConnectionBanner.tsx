import { useReceivingContext } from "@/providers/Receiving/ReceivingProvider";

export default function ConnectionBanner() {
	const { error, stopped, restart } = useReceivingContext();

	if (!error) return null;

	return (
		<div className="flex items-center gap-4 bg-warning-background px-5 py-3 text-xs leading-relaxed text-foreground max-sm:px-3 max-sm:py-2">
			<span>
				{error}
				{!stopped && ". Повторяем подключение автоматически"}
			</span>

			{stopped && (
				<button
					className="shrink-0 rounded-lg border border-warning/50 bg-white px-2 py-1"
					onClick={restart}
				>
					Повторить
				</button>
			)}
		</div>
	);
}
