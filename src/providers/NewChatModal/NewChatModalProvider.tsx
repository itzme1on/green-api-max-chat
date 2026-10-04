import NewChatModal from "#/Modals/NewChatModal/NewChatModal";
import { createContext, useContext, useState, type ReactNode } from "react";

interface ContextProps {
	show: () => void;
	close: () => void;
}

interface Props {
	children: ReactNode;
}

const Context = createContext<ContextProps>({
	show: () => {},
	close: () => {},
});

export const useNewChatModalContext = () => useContext(Context);

export const useShowNewChatModal = () => {
	const { show } = useNewChatModalContext();

	return show;
};

export const useCloseNewChatModal = () => {
	const { close } = useNewChatModalContext();

	return close;
};

export default function NewChatModalProvider({ children }: Props) {
	const [visible, setVisible] = useState(false);

	const show = () => {
		setVisible(true);
	};

	const close = () => {
		setVisible(false);
	};

	const contextData: ContextProps = {
		show,
		close,
	};

	return (
		<Context.Provider value={contextData}>
			{children}

			{visible && <NewChatModal />}
		</Context.Provider>
	);
}
