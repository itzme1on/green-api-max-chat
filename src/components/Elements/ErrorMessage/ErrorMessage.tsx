import classNames from "classnames";
import type { ReactNode } from "react";

interface Props {
	children?: ReactNode;
	className?: string;
}

export default function ErrorMessage({ children, className }: Props) {
	if (!children) return null;

	return (
		<p
			className={classNames(
				"mb-4 rounded-lg bg-error-background px-4 py-3 text-sm leading-normal text-error",
				className
			)}
		>
			{children}
		</p>
	);
}
