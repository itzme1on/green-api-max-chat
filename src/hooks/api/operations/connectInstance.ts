import ApiError from "@/hooks/api/ApiError";
import type { InstanceApi } from "@/types/InstanceApi";

export default async function connectInstance(
	api: InstanceApi,
	signal?: AbortSignal
) {
	const { idInstance, apiTokenInstance } = api.credentials;

	const { data: state } = await api.account.getStateInstance(
		idInstance,
		apiTokenInstance,
		{ signal }
	);

	if (state?.stateInstance !== "authorized") {
		throw new ApiError(
			"Инстанс не авторизован. Проверьте его состояние в личном кабинете GREEN-API"
		);
	}

	const { data: settings } = await api.account.getSettings(
		idInstance,
		apiTokenInstance,
		{ signal }
	);

	if (settings?.typeInstance && settings.typeInstance !== "v3") {
		throw new ApiError("Выберите инстанс для мессенджера MAX");
	}

	if (!settings || settings.incomingWebhook !== "yes" || settings.webhookUrl) {
		throw new ApiError(
			"В настройках инстанса включите «Получать уведомления о входящих сообщениях и файлах» и очистите Webhook URL. После сохранения подождите минуту"
		);
	}
}
