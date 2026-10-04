import ApiError from "@/hooks/api/ApiError";
import type { InstanceApi } from "@/types/InstanceApi";

export default async function checkAccount(
	api: InstanceApi,
	phone: string
): Promise<string> {
	const { idInstance, apiTokenInstance } = api.credentials;

	const { data } = await api.service.checkAccount(
		idInstance,
		apiTokenInstance,
		{ phoneNumber: Number(phone) }
	);

	if (data?.status === false) {
		throw new ApiError("Не удалось проверить номер");
	}

	if (!data?.exist || !data.chatId) {
		throw new ApiError("Аккаунт в MAX по этому номеру не найден");
	}

	return data.chatId;
}
