import { useEffect, useRef } from "react";

export default function useDialog() {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const node = ref.current;

		node?.showModal();

		return () => node?.close();
	}, []);

	return ref;
}
