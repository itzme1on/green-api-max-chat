import ErrorMessage from "#/Elements/ErrorMessage/ErrorMessage";
import PasswordField from "#/Elements/PasswordField/PasswordField";
import PrimaryButton from "#/Elements/PrimaryButton/PrimaryButton";
import Spinner from "#/Elements/Spinner/Spinner";
import TextField from "#/Elements/TextField/TextField";
import LoginFormProvider, {
	useLoginFormContext,
} from "@/providers/LoginForm/LoginFormProvider";

const LoginFormContent = () => {
	const { fields, loading, error, setField, submit } = useLoginFormContext();

	return (
		<form
			className="text-left"
			onSubmit={(event) => {
				event.preventDefault();
				submit();
			}}
		>
			<TextField
				label="idInstance"
				value={fields.idInstance}
				onChange={(event) => setField("idInstance", event.target.value)}
				disabled={loading}
				required
				placeholder="Введите идентификатор"
				inputMode="numeric"
				autoFocus
			/>

			<PasswordField
				label="apiTokenInstance"
				value={fields.apiTokenInstance}
				onChange={(event) =>
					setField("apiTokenInstance", event.target.value)
				}
				disabled={loading}
				required
				placeholder="Введите токен"
			/>

			<TextField
				label="apiUrl"
				value={fields.apiUrl}
				onChange={(event) => setField("apiUrl", event.target.value)}
				disabled={loading}
				required
				type="url"
				placeholder="Введите API URL"
			/>

			<ErrorMessage>{error}</ErrorMessage>

			<PrimaryButton className="w-full" disabled={loading}>
				{loading ? (
					<>
						<Spinner /> Загрузка
					</>
				) : (
					"Подключить"
				)}
			</PrimaryButton>
		</form>
	);
};

export default function LoginForm() {
	return (
		<LoginFormProvider>
			<LoginFormContent />
		</LoginFormProvider>
	);
}
