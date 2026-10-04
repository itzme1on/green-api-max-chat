import type { Credentials } from "@/types/Credentials";
import { validateCredentials } from "@/utils/validateCredentials";
import { Api } from "./api.client";
import apiFetch from "./utils/apiFetch";

export default function getApi(input: Credentials) {
	const credentials = validateCredentials(input);

	const api = new Api({
		baseUrl: credentials.apiUrl,
		baseApiParams: {
			cache: "no-store",
			credentials: "omit",
		},
		customFetch: apiFetch,
	});

	return Object.assign(api, {
		credentials,
	});
}
