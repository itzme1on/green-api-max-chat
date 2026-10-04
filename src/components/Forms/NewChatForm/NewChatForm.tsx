import ErrorMessage from "#/Elements/ErrorMessage/ErrorMessage";
import PrimaryButton from "#/Elements/PrimaryButton/PrimaryButton";
import Spinner from "#/Elements/Spinner/Spinner";
import TextField from "#/Elements/TextField/TextField";
import { useNewChatFormContext } from "@/providers/NewChatForm/NewChatFormProvider";

export default function NewChatForm() {
	const { phone, loading, error, setPhone, submit } = useNewChatFormContext();

	return (
		<form
			className="mt-6"
			onSubmit={(event) => {
				event.preventDefault();
				submit();
			}}
		>
			<TextField
				label="Номер телефона"
				value={phone}
				onChange={(event) => setPhone(event.target.value)}
				type="tel"
				placeholder="+7 999 123 45 67"
				autoComplete="tel"
				required
				autoFocus
				disabled={loading}
			/>

			<ErrorMessage>{error}</ErrorMessage>

			<PrimaryButton className="w-full" disabled={loading}>
				{loading ? (
					<>
						<Spinner /> Проверяем номер
					</>
				) : (
					"Создать чат"
				)}
			</PrimaryButton>
		</form>
	);
}
