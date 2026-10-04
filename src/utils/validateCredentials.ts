import type { Credentials } from "@/types/Credentials";

export function validateCredentials(input: Credentials): Required<Credentials> {
	const idInstance = input.idInstance?.trim() ?? "";
	const apiTokenInstance = input.apiTokenInstance?.trim() ?? "";
	const apiUrl = (input.apiUrl?.trim() ?? "").replace(/\/+$/, "");

	if (!idInstance || !apiTokenInstance || !apiUrl) {
		throw new Error("Заполните все поля");
	}

	if (!apiUrl.startsWith("https://")) {
		throw new Error("apiUrl должен начинаться с https://");
	}

	return { idInstance, apiTokenInstance, apiUrl };
}
