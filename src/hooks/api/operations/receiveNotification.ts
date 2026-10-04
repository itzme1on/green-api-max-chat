import type { InstanceApi } from "@/types/InstanceApi";

export default async function receiveNotification(
	api: InstanceApi,
	signal: AbortSignal
) {
	const { idInstance, apiTokenInstance } = api.credentials;

	const { data } = await api.receiving.receiveNotification(
		idInstance,
		apiTokenInstance,
		{ receiveTimeout: 5 },
		{ signal }
	);

	return data;
}
