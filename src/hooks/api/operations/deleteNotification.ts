import type { InstanceApi } from "@/types/InstanceApi";

export default async function deleteNotification(
	api: InstanceApi,
	receiptId: number,
	signal: AbortSignal
) {
	const { idInstance, apiTokenInstance } = api.credentials;

	await api.receiving.deleteNotification(
		idInstance,
		apiTokenInstance,
		receiptId,
		{ signal }
	);
}
