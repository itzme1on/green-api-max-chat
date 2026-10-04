import classNames from "classnames";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
}

export default function IconButton({ label, className, ...props }: Props) {
	return (
		<button
			type="button"
			className={classNames(
				"inline-flex size-10 shrink-0 items-center justify-center rounded-xl border-0 bg-transparent text-subtle hover:bg-error-background hover:text-error",
				className
			)}
			title={label}
			{...props}
		/>
	);
}
