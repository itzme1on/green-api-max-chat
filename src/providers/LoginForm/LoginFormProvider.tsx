import { useLogin } from "@/providers/Auth/AuthProvider";
import type { Credentials } from "@/types/Credentials";
import getErrorMessage from "@/utils/getErrorMessage";
import { useLoading } from "@kloktun/react-utils";
import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";

interface ContextProps {
	fields: Credentials;
	loading: boolean;
	error?: string;
	setField: (name: keyof Credentials, value: string) => void;
	submit: () => Promise<void>;
}

interface Props {
	children: ReactNode;
}

const Context = createContext<ContextProps>({
	fields: {},
	loading: false,
	setField: () => {},
	submit: async () => {},
});

export const useLoginFormContext = () => useContext(Context);

export default function LoginFormProvider({ children }: Props) {
	const login = useLogin();

	const [fields, setFields] = useState<Credentials>({
		apiUrl: "",
		idInstance: "",
		apiTokenInstance: "",
	});

	const [error, setError] = useState<string>();

	const { loading, enableLoading, disableLoading } = useLoading();

	const request = useRef<AbortController | null>(null);

	useEffect(() => {
		return () => {
			request.current?.abort();
		};
	}, []);

	const setField = (name: keyof Credentials, value: string) => {
		setFields((previous) => ({
			...previous,
			[name]: value,
		}));
	};

	const submit = async () => {
		if (loading) return;

		setError(undefined);

		enableLoading();

		const controller = new AbortController();

		request.current = controller;

		try {
			await login(fields, controller.signal);
		} catch (e) {
			if (!controller.signal.aborted) {
				setError(getErrorMessage(e, "Не удалось подключиться"));
			}
		} finally {
			if (!controller.signal.aborted) {
				disableLoading();
			}
		}
	};

	const contextData: ContextProps = {
		fields,
		loading,
		error,
		setField,
		submit,
	};

	return <Context.Provider value={contextData}>{children}</Context.Provider>;
}
