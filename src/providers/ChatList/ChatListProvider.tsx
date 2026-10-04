import { useChats } from "@/providers/Chats/ChatsProvider";
import type { Chat } from "@/types/Chat";
import { getVisibleChats } from "@/utils/chats";
import {
	createContext,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from "react";

interface ContextProps {
	search: string;
	chats: Chat[];
	setSearch: (value: string) => void;
}

interface Props {
	children: ReactNode;
}

const Context = createContext<ContextProps>({
	search: "",
	chats: [],
	setSearch: () => {},
});

export const useChatListContext = () => useContext(Context);

export const useChatSearch = () => {
	const { search } = useChatListContext();

	return search;
};

export const useSetChatSearch = () => {
	const { setSearch } = useChatListContext();

	return setSearch;
};

export const useVisibleChats = () => {
	const { chats } = useChatListContext();

	return chats;
};

export default function ChatListProvider({ children }: Props) {
	const allChats = useChats();

	const [search, setSearch] = useState("");

	const chats = useMemo(() => {
		return getVisibleChats(allChats, search);
	}, [allChats, search]);

	const contextData: ContextProps = {
		search,
		chats,
		setSearch,
	};

	return <Context.Provider value={contextData}>{children}</Context.Provider>;
}
