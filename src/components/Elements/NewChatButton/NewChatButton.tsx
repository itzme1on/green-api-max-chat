import PrimaryButton from "#/Elements/PrimaryButton/PrimaryButton";
import PlusIcon from "#/Icons/PlusIcon";
import { useShowNewChatModal } from "@/providers/NewChatModal/NewChatModalProvider";
import classNames from "classnames";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
}

export default function NewChatButton({
	className,
	variant = "secondary",
	...props
}: Props) {
	const show = useShowNewChatModal();

	const content = (
		<>
			<PlusIcon size={20} /> Новый чат
		</>
	);

	if (variant === "primary") {
		return (
			<PrimaryButton
				type="button"
				className={className}
				onClick={show}
				{...props}
			>
				{content}
			</PrimaryButton>
		);
	}

	return (
		<button
			type="button"
			className={classNames(
				"mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl border-0 bg-accent-soft text-sm font-semibold text-accent hover:bg-accent/15",
				className
			)}
			onClick={show}
			{...props}
		>
			{content}
		</button>
	);
}
