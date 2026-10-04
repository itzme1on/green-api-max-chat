import LoginForm from "#/Forms/LoginForm/LoginForm";
import LockIcon from "#/Icons/LockIcon";

export default function LoginCard() {
	return (
		<section className="m-auto w-[min(400px,calc(100%-40px))] rounded-3xl border border-stroke bg-white p-10 text-center shadow-xl max-sm:px-5 max-sm:py-8">
			<LoginForm />

			<p className="mt-4 flex items-center justify-center gap-2 text-xs text-subtle">
				<LockIcon size={16} /> Токен хранится только в памяти этой страницы
			</p>
		</section>
	);
}
