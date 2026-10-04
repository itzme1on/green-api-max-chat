import ApiError from "@/hooks/api/ApiError";
import type { Notification } from "@/types/Notification";
import { wait } from "@/utils/wait";

interface NotificationApi {
	receiveNotification: (signal: AbortSignal) => Promise<Notification | null>;
	deleteNotification: (
		receiptId: number,
		signal: AbortSignal
	) => Promise<void>;
}

export async function pollNotifications(
	api: NotificationApi,
	options: {
		signal: AbortSignal;
		onNotification: (body: Record<string, unknown>) => void;
		onConnection: (error: string | null, stopped: boolean) => void;
	}
) {
	const { signal, onNotification, onConnection } = options;

	while (!signal.aborted) {
		try {
			const notification = await api.receiveNotification(signal);

			if (signal.aborted) break;

			if (notification) {
				onNotification(notification.body);
				await api.deleteNotification(notification.receiptId, signal);
			}

			onConnection(null, false);

			await wait(300, signal);
		} catch (error) {
			if (signal.aborted) break;

			const stopped =
				error instanceof ApiError &&
				[400, 401, 403, 404, 466].includes(error.status);

			onConnection(
				error instanceof Error
					? error.message
					: "Не удалось получить сообщения",
				stopped
			);

			if (stopped) break;

			try {
				await wait(5000, signal);
			} catch {
				break;
			}
		}
	}
}
