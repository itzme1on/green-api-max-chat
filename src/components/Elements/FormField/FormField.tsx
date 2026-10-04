import type { ReactNode } from "react";

interface Props {
	label: string;
	hint?: string;
	children: ReactNode;
}

export default function FormField({ label, hint, children }: Props) {
	return (
		<label className="mb-5 flex flex-col gap-2 text-sm font-semibold">
			{label}
			{children}
			{hint && (
				<span className="text-xs leading-normal font-normal text-muted">
					{hint}
				</span>
			)}
		</label>
	);
}
