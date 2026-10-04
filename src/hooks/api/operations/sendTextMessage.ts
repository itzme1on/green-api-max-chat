import ApiError from "@/hooks/api/ApiError";
import type { InstanceApi } from "@/types/InstanceApi";

export default async function sendTextMessage(
	api: InstanceApi,
	chatId: string,
	message: string
): Promise<string> {
	if (!message.trim() || message.length > 4000) {
		throw new Error("Сообщение должно содержать от 1 до 4000 символов");
	}

	const { idInstance, apiTokenInstance } = api.credentials;

	const { data } = await api.sending.sendMessage(
		idInstance,
		apiTokenInstance,
		{ chatId, message }
	);

	if (!data?.idMessage) {
		throw new ApiError("Сервер не подтвердил отправку сообщения");
	}

	return data.idMessage;
}
