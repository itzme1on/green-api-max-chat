import {
	useChats,
	useCreateChat,
	useUpdateChats,
} from "@/providers/Chats/ChatsProvider";
import { markRead } from "@/utils/chats";
import {
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
	type ReactNode,
} from "react";

interface ContextProps {
	activeId: string | null;
	getActiveId: () => string | null;
	selectChat: (id: string | null) => void;
	createChat: (phone: string) => Promise<void>;
}

interface Props {
	children: ReactNode;
}

const Context = createContext<ContextProps>({
	activeId: null,
	getActiveId: () => null,
	selectChat: () => {},
	createChat: async () => {},
});

export const useCurrentChatContext = () => useContext(Context);

export const useCurrentChatId = () => {
	const { activeId } = useCurrentChatContext();

	return activeId;
};

export const useCurrentChat = () => {
	const id = useCurrentChatId();
	const chats = useChats();

	return chats.find((chat) => chat.id === id);
};

export const useSelectChat = () => {
	const { selectChat } = useCurrentChatContext();

	return selectChat;
};

export const useCreateAndSelectChat = () => {
	const { createChat } = useCurrentChatContext();

	return createChat;
};

export default function CurrentChatProvider({ children }: Props) {
	const update = useUpdateChats();
	const create = useCreateChat();

	const [activeId, setActiveId] = useState<string | null>(null);

	const current = useRef<string | null>(null);

	const getActiveId = useCallback(() => current.current, []);

	const selectChat = useCallback(
		(id: string | null) => {
			if (id) update((state) => markRead(state, id));

			current.current = id;

			setActiveId(id);
		},
		[update]
	);

	const createChat = async (phone: string) => {
		const id = await create(phone);

		selectChat(id);
	};

	const contextData: ContextProps = {
		activeId,
		getActiveId,
		selectChat,
		createChat,
	};

	return <Context.Provider value={contextData}>{children}</Context.Provider>;
}
