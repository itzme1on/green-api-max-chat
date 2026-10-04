import IconButton from "#/Elements/IconButton/IconButton";
import NewChatForm from "#/Forms/NewChatForm/NewChatForm";
import CloseIcon from "#/Icons/CloseIcon";
import useDialog from "@/hooks/dialog/useDialog";
import NewChatFormProvider, {
	useNewChatFormContext,
} from "@/providers/NewChatForm/NewChatFormProvider";
import { useCloseNewChatModal } from "@/providers/NewChatModal/NewChatModalProvider";

const NewChatDialog = () => {
	const ref = useDialog();
	const close = useCloseNewChatModal();

	const { loading } = useNewChatFormContext();

	return (
		<dialog
			ref={ref}
			className="m-auto w-[min(420px,calc(100%-32px))] rounded-3xl border-0 bg-white p-6 text-foreground shadow-2xl backdrop:bg-foreground/30 backdrop:backdrop-blur-xs"
			onCancel={(event) => {
				event.preventDefault();

				if (!loading) close();
			}}
		>
			<div className="mb-2 flex items-center justify-between">
				<h2 className="text-xl font-semibold tracking-tight">Новый чат</h2>

				<IconButton label="Закрыть" onClick={close} disabled={loading}>
					<CloseIcon size={22} />
				</IconButton>
			</div>

			<p className="text-sm leading-relaxed text-muted">
				Введите номер человека, которому хотите написать
			</p>

			<NewChatForm />
		</dialog>
	);
};

export default function NewChatModal() {
	return (
		<NewChatFormProvider>
			<NewChatDialog />
		</NewChatFormProvider>
	);
}
