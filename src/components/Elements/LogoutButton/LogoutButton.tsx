import IconButton from "#/Elements/IconButton/IconButton";
import LogoutIcon from "#/Icons/LogoutIcon";
import { useLogout } from "@/providers/Auth/AuthProvider";

export default function LogoutButton() {
	const logout = useLogout();

	return (
		<IconButton label="Выйти" onClick={logout}>
			<LogoutIcon size={20} />
		</IconButton>
	);
}
