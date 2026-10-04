import ChatIcon from "#/Icons/ChatIcon";
import classNames from "classnames";

interface Props {
	name: string;
	large?: boolean;
}

export default function Avatar({ name, large = false }: Props) {
	return (
		<span
			className={classNames(
				"inline-flex shrink-0 items-center justify-center rounded-full bg-accent-soft font-semibold text-accent/70",
				{
					"size-19 text-xl": large,
					"size-12 text-sm": !large,
				}
			)}
		>
			{name.startsWith("+") ? (
				<ChatIcon size={large ? 24 : 20} />
			) : (
				name.trim().slice(0, 2).toUpperCase()
			)}
		</span>
	);
}
