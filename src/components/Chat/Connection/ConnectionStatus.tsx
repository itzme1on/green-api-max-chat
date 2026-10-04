import LogoutButton from "@/components/Elements/LogoutButton/LogoutButton";
import { useCredentials } from "@/providers/Auth/AuthProvider";
import {
	useReceivingError,
	useReceivingStopped,
} from "@/providers/Receiving/ReceivingProvider";
import classNames from "classnames";

export default function ConnectionStatus() {
	const credentials = useCredentials();

	const error = useReceivingError();
	const stopped = useReceivingStopped();

	const label = stopped
		? "Получение приостановлено"
		: error
			? "Восстанавливаем соединение"
			: "GREEN-API подключён";

	return (
		<footer className="flex items-center gap-2 border-t border-stroke px-6 py-5 justify-between">
			<div className="flex flex-row items-center gap-2 flex-1">
				<span
					className={classNames("size-2 shrink-0 rounded-full", {
						"bg-warning": !!error,
						"bg-success": !error,
					})}
				/>

				<div className="flex flex-col gap-1">
					<span className="text-xs text-muted">{label}</span>

					<small className="text-xs text-subtle">
						Инстанс {credentials?.idInstance}
					</small>
				</div>
			</div>

			<LogoutButton />
		</footer>
	);
}
