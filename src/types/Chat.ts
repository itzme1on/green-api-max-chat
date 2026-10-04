import type { Message } from "./Message";

export interface Chat {
	id: string;
	phone?: string;
	name: string;
	unread: number;
	messages: Message[];
}
