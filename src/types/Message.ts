export interface Message {
	id: string;
	text: string;
	timestamp: number;
	direction: "incoming" | "outgoing";
	error?: string;
}
