import ChatsProvider from "@/providers/Chats/ChatsProvider";
import CurrentChatProvider from "@/providers/CurrentChat/CurrentChatProvider";
import NewChatModalProvider from "@/providers/NewChatModal/NewChatModalProvider";
import ReceivingProvider from "@/providers/Receiving/ReceivingProvider";
import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function ChatSessionWrapper({ children }: Props) {
	return (
		<ChatsProvider>
			<CurrentChatProvider>
				<ReceivingProvider>
					<NewChatModalProvider>{children}</NewChatModalProvider>
				</ReceivingProvider>
			</CurrentChatProvider>
		</ChatsProvider>
	);
}
