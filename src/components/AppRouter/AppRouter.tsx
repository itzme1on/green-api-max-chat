import ChatPage from "#/Pages/ChatPage/ChatPage";
import LoginPage from "#/Pages/LoginPage/LoginPage";
import { useIsAuth } from "@/providers/Auth/AuthProvider";
import ChatSessionWrapper from "@/wrappers/ChatSession/ChatSessionWrapper";

export default function AppRouter() {
	const isAuth = useIsAuth();

	return !isAuth ? (
		<LoginPage />
	) : (
		<ChatSessionWrapper>
			<ChatPage />
		</ChatSessionWrapper>
	);
}
