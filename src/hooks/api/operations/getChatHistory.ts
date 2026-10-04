import type { InstanceApi } from "@/types/InstanceApi";

export default async function getChatHistory(api: InstanceApi, chatId: string) {
	const { idInstance, apiTokenInstance } = api.credentials;

	const { data } = await api.journals.getChatHistory(
		idInstance,
		apiTokenInstance,
		{
			chatId,
			count: 100,
		}
	);

	return data ?? [];
}
