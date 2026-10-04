import type { GetChatHistoryResponse } from "@/hooks/api/api.client";

export type HistoryMessage = GetChatHistoryResponse[number];
