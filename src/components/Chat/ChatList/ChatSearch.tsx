import SearchIcon from "#/Icons/SearchIcon";
import {
	useChatSearch,
	useSetChatSearch,
} from "@/providers/ChatList/ChatListProvider";

export default function ChatSearch() {
	const search = useChatSearch();
	const setSearch = useSetChatSearch();

	return (
		<label className="flex items-center gap-2 rounded-xl bg-background px-3 text-subtle focus-within:ring-2 focus-within:ring-accent/50">
			<SearchIcon size={20} />

			<input
				className="h-10 min-w-0 w-full border-0 bg-transparent text-sm focus:outline-none"
				placeholder="Поиск"
				value={search}
				onChange={(event) => setSearch(event.target.value)}
			/>
		</label>
	);
}
