import FormField from "#/Elements/FormField/FormField";
import Input from "#/Elements/Input/Input";
import type { InputHTMLAttributes } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	hint?: string;
}

export default function TextField({ label, hint, ...props }: TextFieldProps) {
	return (
		<FormField label={label} hint={hint}>
			<Input autoComplete="off" {...props} />
		</FormField>
	);
}
