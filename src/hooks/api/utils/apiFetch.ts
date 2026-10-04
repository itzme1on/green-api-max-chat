import ApiError from "@/hooks/api/ApiError";

const errors: Record<number, string> = {
	401: "Неверные данные доступа",
	403: "Доступ запрещён. Проверьте токен и состояние аккаунта",
	429: "Превышен лимит запросов. Подождите и попробуйте снова",
	466: "Исчерпан лимит текущего тарифа. Проверьте квоты в личном кабинете",
};

const apiFetch: typeof fetch = async (input, options) => {
	let response: Response;

	try {
		response = await fetch(input, options);
	} catch (error) {
		if (options?.signal?.aborted) throw error;

		throw new ApiError(
			"Не удалось связаться с GREEN-API. Проверьте интернет и apiUrl"
		);
	}

	if (!response.ok) {
		throw new ApiError(
			errors[response.status] ?? `Ошибка GREEN-API (${response.status})`,
			response.status
		);
	}

	return response;
};

export default apiFetch;
