import { useCreateAndSelectChat } from "@/providers/CurrentChat/CurrentChatProvider";
import { useCloseNewChatModal } from "@/providers/NewChatModal/NewChatModalProvider";
import getErrorMessage from "@/utils/getErrorMessage";
import { useLoading } from "@kloktun/react-utils";
import { createContext, useContext, useState, type ReactNode } from "react";

interface ContextProps {
	phone: string;
	error: string;
	loading: boolean;
	setPhone: (phone: string) => void;
	submit: () => Promise<void>;
}

interface Props {
	children: ReactNode;
}

const Context = createContext<ContextProps>({
	phone: "",
	error: "",
	loading: false,
	setPhone: () => {},
	submit: async () => {},
});

export const useNewChatFormContext = () => useContext(Context);

export default function NewChatFormProvider({ children }: Props) {
	const createChat = useCreateAndSelectChat();
	const close = useCloseNewChatModal();

	const [phone, setPhone] = useState("");
	const [error, setError] = useState("");

	const { loading, enableLoading, disableLoading } = useLoading();

	const submit = async () => {
		if (loading) return;

		enableLoading();

		setError("");

		try {
			await createChat(phone);

			close();
		} catch (e) {
			setError(getErrorMessage(e, "Не удалось создать чат"));

			disableLoading();
		}
	};

	const contextData: ContextProps = {
		phone,
		error,
		loading,
		setPhone,
		submit,
	};

	return <Context.Provider value={contextData}>{children}</Context.Provider>;
}
