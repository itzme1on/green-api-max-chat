import type { InstanceApi } from "@/types/InstanceApi";

export default async function getChats(api: InstanceApi) {
	const { idInstance, apiTokenInstance } = api.credentials;

	const { data } = await api.service.getChats(idInstance, apiTokenInstance);

	return data ?? [];
}
