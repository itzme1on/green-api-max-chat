import FormField from "#/Elements/FormField/FormField";
import IconButton from "#/Elements/IconButton/IconButton";
import Input from "#/Elements/Input/Input";
import type { TextFieldProps } from "#/Elements/TextField/TextField";
import EyeIcon from "#/Icons/EyeIcon";
import classNames from "classnames";
import { useState } from "react";

export default function PasswordField({
	label,
	hint,
	className,
	...props
}: TextFieldProps) {
	const [visible, setVisible] = useState(false);

	return (
		<FormField label={label} hint={hint}>
			<span className="relative">
				<Input
					className={classNames("pr-12", className)}
					autoComplete="off"
					spellCheck={false}
					type={visible ? "text" : "password"}
					{...props}
				/>

				<IconButton
					className="absolute top-1/2 -translate-y-1/2 right-1"
					label={visible ? "Скрыть токен" : "Показать токен"}
					onClick={() => setVisible((value) => !value)}
				>
					<EyeIcon size={20} />
				</IconButton>
			</span>
		</FormField>
	);
}
