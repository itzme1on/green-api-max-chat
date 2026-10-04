import getChatHistory from "@/hooks/api/operations/getChatHistory";
import useApi from "@/hooks/api/useApi";
import { useSendMessage } from "@/providers/Chats/ChatsProvider";
import { useReceivingStopped } from "@/providers/Receiving/ReceivingProvider";
import type { Chat } from "@/types/Chat";
import type { Message } from "@/types/Message";
import getErrorMessage from "@/utils/getErrorMessage";
import { mergeHistory } from "@/utils/messages";
import { useLoad, useLoading } from "@kloktun/react-utils";
import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ReactNode,
	type RefObject,
} from "react";

interface History {
	messages: Message[];
	loaded: boolean;
	loading: boolean;
	error?: unknown;
	load: () => Promise<void>;
}

interface Composer {
	draft: string;
	error: string;
	loading: boolean;
	disabled: boolean;
	scrollVersion: number;
	input: RefObject<HTMLTextAreaElement | null>;
	setDraft: (value: string) => void;
	submit: () => Promise<void>;
}

interface ContextProps {
	chat: Chat;
	history: History;
	composer: Composer;
}

interface Props {
	children: ReactNode;
	chat: Chat;
}

const Context = createContext<ContextProps>({
	chat: {
		id: "",
		name: "",
		unread: 0,
		messages: [],
	},
	history: {
		messages: [],
		loaded: false,
		loading: false,
		load: async () => {},
	},
	composer: {
		draft: "",
		error: "",
		loading: false,
		disabled: false,
		scrollVersion: 0,
		input: { current: null },
		setDraft: () => {},
		submit: async () => {},
	},
});

export const useConversationContext = () => useContext(Context);

export const useConversationChat = () => {
	const { chat } = useConversationContext();

	return chat;
};

export const useConversationHistory = () => {
	const { history } = useConversationContext();

	return history;
};

export const useConversationMessages = () => {
	const { messages } = useConversationHistory();

	return messages;
};

export const useConversationComposer = () => {
	const { composer } = useConversationContext();

	return composer;
};

export default function ConversationProvider({ chat, children }: Props) {
	const api = useApi();
	const send = useSendMessage();
	const disabled = useReceivingStopped();

	const [draft, setDraft] = useState("");
	const [error, setError] = useState("");
	const [scrollVersion, setScrollVersion] = useState(0);

	const { loading, enableLoading, disableLoading } = useLoading();

	const input = useRef<HTMLTextAreaElement>(null);

	const history = useLoad({
		manual: true,
		load: () => getChatHistory(api, chat.id),
	});

	useEffect(() => {
		const timer = setTimeout(history.load, 0);

		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chat.id]);

	const messages = useMemo(() => {
		return mergeHistory(history.data ?? [], chat.messages);
	}, [chat.messages, history.data]);

	const submit = async () => {
		if (!draft.trim() || loading || disabled) return;

		enableLoading();

		setError("");
		setScrollVersion((value) => value + 1);

		try {
			await send(chat.id, draft);

			setDraft("");
		} catch (e) {
			setError(getErrorMessage(e, "Не удалось отправить сообщение"));
		} finally {
			disableLoading();

			input.current?.focus();
		}
	};

	const contextData: ContextProps = {
		chat,
		history: {
			messages,
			loaded: !!history.data,
			loading: history.loading || (!history.data && !history.error),
			error: history.error,
			load: history.load,
		},
		composer: {
			draft,
			error,
			loading,
			disabled,
			scrollVersion,
			input,
			setDraft,
			submit,
		},
	};

	return <Context.Provider value={contextData}>{children}</Context.Provider>;
}
