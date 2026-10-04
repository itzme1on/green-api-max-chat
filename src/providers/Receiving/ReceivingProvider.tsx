import deleteNotification from "@/hooks/api/operations/deleteNotification";
import receiveNotification from "@/hooks/api/operations/receiveNotification";
import useApi from "@/hooks/api/useApi";
import { useUpdateChats } from "@/providers/Chats/ChatsProvider";
import { useCurrentChatContext } from "@/providers/CurrentChat/CurrentChatProvider";
import { applyNotification } from "@/utils/notifications";
import { pollNotifications } from "@/utils/pollNotifications";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

interface ContextProps {
	error: string | null;
	stopped: boolean;
	restart: () => void;
}

interface Props {
	children: ReactNode;
}

const Context = createContext<ContextProps>({
	error: null,
	stopped: false,
	restart: () => {},
});

export const useReceivingContext = () => useContext(Context);

export const useReceivingError = () => {
	const { error } = useReceivingContext();

	return error;
};

export const useReceivingStopped = () => {
	const { stopped } = useReceivingContext();

	return stopped;
};

export const useRestartReceiving = () => {
	const { restart } = useReceivingContext();

	return restart;
};

export default function ReceivingProvider({ children }: Props) {
	const api = useApi();
	const update = useUpdateChats();

	const { getActiveId } = useCurrentChatContext();

	const [error, setError] = useState<string | null>(null);
	const [stopped, setStopped] = useState(false);
	const [retry, setRetry] = useState(0);

	useEffect(() => {
		const controller = new AbortController();

		pollNotifications(
			{
				receiveNotification: (signal) => receiveNotification(api, signal),
				deleteNotification: (id, signal) =>
					deleteNotification(api, id, signal),
			},
			{
				signal: controller.signal,
				onNotification: (body) =>
					update((state) => applyNotification(state, body, getActiveId())),
				onConnection: (message, isStopped) => {
					setError(message);
					setStopped(isStopped);
				},
			}
		);

		return () => controller.abort();
	}, [api, update, getActiveId, retry]);

	const restart = () => {
		setError(null);
		setStopped(false);
		setRetry((value) => value + 1);
	};

	const contextData: ContextProps = {
		error,
		stopped,
		restart,
	};

	return <Context.Provider value={contextData}>{children}</Context.Provider>;
}
