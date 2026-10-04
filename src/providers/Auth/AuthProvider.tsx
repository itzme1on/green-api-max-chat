import getApi from "@/hooks/api/getApi";
import connectInstance from "@/hooks/api/operations/connectInstance";
import type { Credentials } from "@/types/Credentials";
import {
	createContext,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from "react";

interface ContextProps {
	credentials?: Credentials;
	isAuth: boolean;
	login: (input: Credentials, signal?: AbortSignal) => void;
	logout: () => void;
}

interface Props {
	children: ReactNode;
}

const Context = createContext<ContextProps>({
	isAuth: false,
	login: () => {},
	logout: () => {},
});

export const useAuthContext = () => useContext(Context);

export const useCredentials = () => {
	const { credentials } = useAuthContext();

	return credentials;
};

export const useIsAuth = () => {
	const { isAuth } = useAuthContext();

	return isAuth;
};

export const useLogin = () => {
	const { login } = useAuthContext();

	return login;
};

export const useLogout = () => {
	const { logout } = useAuthContext();

	return logout;
};

export default function AuthProvider({ children }: Props) {
	const [credentials, setCredentials] = useState<Credentials | undefined>();

	const login = async (input: Credentials, signal?: AbortSignal) => {
		const api = getApi(input);

		await connectInstance(api, signal);

		if (!signal?.aborted) setCredentials(api.credentials);
	};

	const logout = () => {
		setCredentials(undefined);
	};

	const isAuth = useMemo(() => {
		return !!credentials;
	}, [credentials]);

	const contextData: ContextProps = {
		credentials,
		isAuth,
		login,
		logout,
	};

	return <Context.Provider value={contextData}>{children}</Context.Provider>;
}
