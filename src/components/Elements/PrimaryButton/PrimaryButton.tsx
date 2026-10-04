import classNames from "classnames";
import type { ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={classNames(
				"flex flex-row min-h-12 gap-2 rounded-xl border-0 bg-accent px-5 py-3 text-sm font-semibold text-white enabled:hover:bg-accent-hover items-center justify-center",
				className
			)}
			{...props}
		/>
	);
}
