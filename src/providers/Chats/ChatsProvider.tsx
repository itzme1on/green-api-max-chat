import checkAccount from "@/hooks/api/operations/checkAccount";
import getChats from "@/hooks/api/operations/getChats";
import sendTextMessage from "@/hooks/api/operations/sendTextMessage";
import useApi from "@/hooks/api/useApi";
import type { Chat } from "@/types/Chat";
import type { ChatState } from "@/types/ChatState";
import {
	addOutgoing,
	emptyState,
	finishOutgoing,
	mergeChats,
	openChat,
} from "@/utils/chats";
import getErrorMessage from "@/utils/getErrorMessage";
import { normalizePhone } from "@/utils/phone";
import { useLoad } from "@kloktun/react-utils";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

interface ChatsLoad {
	loading: boolean;
	error?: unknown;
	load: () => Promise<void>;
}

interface ContextProps {
	chats: Chat[];
	list: ChatsLoad;
	update: (transform: (state: ChatState) => ChatState) => void;
	createChat: (input: string) => Promise<string>;
	send: (chatId: string, text: string) => Promise<void>;
}

interface Props {
	children: ReactNode;
}

const Context = createContext<ContextProps>({
	chats: [],
	list: {
		loading: false,
		load: async () => {},
	},
	update: () => {},
	createChat: async () => "",
	send: async () => {},
});

export const useChatsContext = () => useContext(Context);

export const useChats = () => {
	const { chats } = useChatsContext();

	return chats;
};

export const useChatsLoad = () => {
	const { list } = useChatsContext();

	return list;
};

export const useCreateChat = () => {
	const { createChat } = useChatsContext();

	return createChat;
};

export const useSendMessage = () => {
	const { send } = useChatsContext();

	return send;
};

export const useUpdateChats = () => {
	const { update } = useChatsContext();

	return update;
};

export default function ChatsProvider({ children }: Props) {
	const api = useApi();

	const [state, setState] = useState<ChatState>(emptyState);

	const { data, loading, error, load } = useLoad({
		manual: true,
		load: async () => {
			const chats = await getChats(api);

			setState((state) => mergeChats(state, chats));

			return chats;
		},
	});

	useEffect(() => {
		const timer = setTimeout(load, 0);

		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const createChat = async (input: string) => {
		const phone = normalizePhone(input);
		const existing = state.chats.find((chat) => chat.phone === phone);

		if (existing) return existing.id;

		const id = await checkAccount(api, phone);

		setState((state) => openChat(state, id, phone));

		return id;
	};

	const send = async (chatId: string, text: string) => {
		const id = `local:${crypto.randomUUID()}`;

		setState((state) =>
			addOutgoing(state, chatId, {
				id,
				text,
				timestamp: Date.now(),
				direction: "outgoing",
			})
		);

		try {
			const serverId = await sendTextMessage(api, chatId, text);

			setState((state) =>
				finishOutgoing(state, chatId, id, { id: serverId })
			);
		} catch (error) {
			setState((state) =>
				finishOutgoing(state, chatId, id, {
					error: getErrorMessage(error, "Не удалось отправить сообщение"),
				})
			);

			throw error;
		}
	};

	const contextData: ContextProps = {
		chats: state.chats,
		list: {
			loading: loading || (!data && !error),
			error,
			load,
		},
		update: setState,
		createChat,
		send,
	};

	return <Context.Provider value={contextData}>{children}</Context.Provider>;
}
