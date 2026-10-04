import NewChatButton from "#/Elements/NewChatButton/NewChatButton";

export default function ChatWelcome() {
	return (
		<section className="flex flex-1 items-center justify-center bg-radial from-accent-soft to-transparent to-70% p-9">
			<div className="max-w-115 text-center flex flex-col">
				<p className="mt-4 text-base text-subtle">
					Выберите чат слева или создайте новый
					<br />
					Сообщения и ответы появятся здесь
				</p>

				<NewChatButton variant="primary" className="mt-7" />
			</div>
		</section>
	);
}
