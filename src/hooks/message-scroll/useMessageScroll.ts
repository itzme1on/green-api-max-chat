import type { Message } from "@/types/Message";
import { useEffect, useRef } from "react";

export default function useMessageScroll(
	messages: Message[],
	scrollVersion: number
) {
	const list = useRef<HTMLDivElement>(null);
	const nearBottom = useRef(true);
	const previousVersion = useRef(scrollVersion);

	useEffect(() => {
		if (scrollVersion !== previousVersion.current) {
			nearBottom.current = true;

			previousVersion.current = scrollVersion;
		}

		if (nearBottom.current) {
			list.current?.scrollTo({
				top: list.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [messages, scrollVersion]);

	const handleScroll = () => {
		const node = list.current;

		if (node) {
			nearBottom.current =
				node.scrollHeight - node.scrollTop - node.clientHeight < 100;
		}
	};

	return { list, handleScroll };
}
