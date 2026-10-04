import type { Message } from "@/types/Message";
import { formatTime } from "@/utils/formatDate";
import classNames from "classnames";

interface Props {
	message: Message;
}

export default function MessageItem({ message }: Props) {
	const incoming = message.direction === "incoming";
	const failed = !!message.error;

	return (
		<div
			className={classNames(
				"mb-2 w-fit max-w-4/5 rounded-2xl px-4 pt-3 pb-2 shadow-xs max-sm:max-w-11/12",
				{
					"mr-auto rounded-bl-sm": incoming,
					"ml-auto rounded-br-sm": !incoming,
					"bg-error-background": failed,
					"bg-message-outgoing": !failed && !incoming,
					"bg-white": !failed && incoming,
				}
			)}
		>
			<p className="text-sm leading-normal whitespace-pre-wrap wrap-anywhere">
				{message.text}
			</p>

			<time className="mt-1 block text-right text-xs text-subtle">
				{formatTime(message.timestamp)}
			</time>

			{message.error && (
				<p className="mt-2 text-xs leading-normal text-error">
					{message.error}
				</p>
			)}
		</div>
	);
}
