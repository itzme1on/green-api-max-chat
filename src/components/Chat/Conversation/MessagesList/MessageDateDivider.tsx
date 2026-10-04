import { formatDate } from "@/utils/formatDate";

interface Props {
	timestamp: number;
}

export default function MessageDateDivider({ timestamp }: Props) {
	return (
		<div className="clear-both mt-1 mb-6 text-center">
			<span className="rounded-full text-xs text-subtle">
				{formatDate(timestamp)}
			</span>
		</div>
	);
}
