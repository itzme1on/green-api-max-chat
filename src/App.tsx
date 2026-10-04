import AppRouter from "#/AppRouter/AppRouter";
import AuthProvider from "@/providers/Auth/AuthProvider";

export default function App() {
	return (
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	);
}
