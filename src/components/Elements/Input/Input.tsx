import classNames from "classnames";
import type { InputHTMLAttributes } from "react";

export default function Input({
	className,
	...props
}: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className={classNames(
				"h-12 w-full rounded-xl border border-stroke bg-white px-4 text-sm font-normal text-foreground transition-colors duration-150 focus:border-accent focus:ring-3 focus:ring-accent/10 focus:outline-none",
				className
			)}
			{...props}
		/>
	);
}
