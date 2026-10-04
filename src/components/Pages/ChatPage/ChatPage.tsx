import ChatMain from "#/Chat/ChatMain";
import ChatSidebar from "#/Chat/Sidebar/ChatSidebar";

export default function ChatPage() {
	return (
		<main className="flex h-dvh overflow-hidden bg-white">
			<ChatSidebar />

			<ChatMain />
		</main>
	);
}
