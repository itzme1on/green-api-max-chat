import { useCredentials } from "@/providers/Auth/AuthProvider";
import { useMemo } from "react";
import getApi from "./getApi";

export default function useApi() {
	const credentials = useCredentials();

	return useMemo(() => {
		return getApi(credentials ?? {});
	}, [credentials]);
}
