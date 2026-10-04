/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GetStateInstanceResponse {
	stateInstance: string;
}

export interface GetSettingsResponse {
	wid: string;
	typeInstance: string;
	webhookUrl: string;
	webhookUrlToken: string;
	delaySendMessagesMilliseconds: number;
	markIncomingMessagesReaded: string;
	markIncomingMessagesReadedOnReply: string;
	proxyInstance: string;
	outgoingWebhook: string;
	outgoingMessageWebhook: string;
	outgoingAPIMessageWebhook: string;
	incomingWebhook: string;
}

/** status=false indicates a failed check rather than a nonexistent recipient. https://green-api.com/v3/docs/api/service/CheckAccount/ */
export interface CheckAccountResponse {
	exist?: boolean;
	chatId?: string;
	status?: boolean;
}

export interface CheckAccountRequest {
	phoneNumber: number;
}

export interface SendMessageResponse {
	idMessage: string;
}

export interface SendMessageRequest {
	chatId: string;
	message: string;
	quotedMessageId?: string;
	typingTime?: number;
}

/** History includes text and non-text messages. https://green-api.com/v3/docs/api/journals/GetChatHistory/ */
export type GetChatHistoryResponse = {
	type: "incoming" | "outgoing";
	idMessage: string;
	timestamp: number;
	chatId: string;
	typeMessage: string;
	textMessage?: string;
	statusMessage?: "sent" | "delivered" | "read";
}[];

export interface GetChatHistoryRequest {
	chatId: string;
	count: number;
}

/** Empty queue returns null. Body may be any notification type, including types not handled by this text chat. https://green-api.com/v3/docs/api/receiving/technology-http-api/ReceiveNotification/ */
export type ReceiveNotificationResponse = {
	receiptId: number;
	body: Record<string, any>;
} | null;

export interface DeleteNotificationResponse {
	result: boolean;
	reason: string;
}

export type GetChatsResponse = {
	chatId: string;
	name: string;
	type: "user" | "group" | "channel" | "bot";
	/** @min 0 */
	phoneNumber: number;
	/** @min 0 */
	unreadCount?: number;
}[];

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat;
	/** request body */
	body?: unknown;
	/** base url */
	baseUrl?: string;
	/** request cancellation token */
	cancelToken?: CancelToken;
}

export type RequestParams = Omit<
	FullRequestParams,
	"body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string;
	baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
	securityWorker?: (
		securityData: SecurityDataType | null
	) => Promise<RequestParams | void> | RequestParams | void;
	customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
	extends Response {
	data: D;
	error: E;
}

type CancelToken = Symbol | string | number;

export type ContentType =
	| "application/json"
	| "application/vnd.api+json"
	| "multipart/form-data"
	| "application/x-www-form-urlencoded"
	| "text/plain";

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = "https://api.green-api.com";
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
	private abortControllers = new Map<CancelToken, AbortController>();
	private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
		fetch(...fetchParams);

	private baseApiParams: RequestParams = {
		credentials: "same-origin",
		headers: {},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	};

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig);
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key);
		return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key]);
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key];
		return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {};
		const keys = Object.keys(query).filter(
			(key) => "undefined" !== typeof query[key]
		);
		return keys
			.map((key) =>
				Array.isArray(query[key])
					? this.addArrayQueryParam(query, key)
					: this.addQueryParam(query, key)
			)
			.join("&");
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery);
		return queryString ? `?${queryString}` : "";
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		["application/json"]: (input: any) =>
			input !== null &&
			(typeof input === "object" || typeof input === "string")
				? JSON.stringify(input)
				: input,
		["application/vnd.api+json"]: (input: any) =>
			input !== null &&
			(typeof input === "object" || typeof input === "string")
				? JSON.stringify(input)
				: input,
		["text/plain"]: (input: any) =>
			input !== null && typeof input !== "string"
				? JSON.stringify(input)
				: input,
		["multipart/form-data"]: (input: any) => {
			if (input instanceof FormData) {
				return input;
			}

			return Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key];
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === "object" && property !== null
							? JSON.stringify(property)
							: `${property}`
				);
				return formData;
			}, new FormData());
		},
		["application/x-www-form-urlencoded"]: (input: any) =>
			this.toQueryString(input),
	};

	protected mergeRequestParams(
		params1: RequestParams,
		params2?: RequestParams
	): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	protected createAbortSignal = (
		cancelToken: CancelToken
	): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken);
			if (abortController) {
				return abortController.signal;
			}
			return void 0;
		}

		const abortController = new AbortController();
		this.abortControllers.set(cancelToken, abortController);
		return abortController.signal;
	};

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken);

		if (abortController) {
			abortController.abort();
			this.abortControllers.delete(cancelToken);
		}
	};

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<HttpResponse<T, E>> => {
		const secureParams =
			((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const queryString = query && this.toQueryString(query);
		const payloadFormatter =
			this.contentFormatters[type || "application/json"];
		const responseFormat = format || requestParams.format;

		return this.customFetch(
			`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
			{
				...requestParams,
				headers: {
					...(requestParams.headers || {}),
					...(type && type !== "multipart/form-data"
						? { "Content-Type": type }
						: {}),
				},
				signal:
					(cancelToken
						? this.createAbortSignal(cancelToken)
						: requestParams.signal) || null,
				body:
					typeof body === "undefined" || body === null
						? null
						: payloadFormatter(body),
			}
		).then(async (response) => {
			const r = response as HttpResponse<T, E>;
			r.data = null as unknown as T;
			r.error = null as unknown as E;

			const responseToParse = responseFormat ? response.clone() : response;
			const data = !responseFormat
				? r
				: await responseToParse[responseFormat]()
						.then((data) => {
							if (r.ok) {
								r.data = data;
							} else {
								r.error = data;
							}
							return r;
						})
						.catch((e) => {
							r.error = e;
							return r;
						});

			if (cancelToken) {
				this.abortControllers.delete(cancelToken);
			}

			if (!response.ok) throw data;
			return data;
		});
	};
}

/**
 * @title GREEN-API MAX chat
 * @version 1.0.0
 * @baseUrl https://api.green-api.com
 *
 * Derived from the official Postman collection. Example-inferred schemas; documented refinements in schema-overrides.json. Covers only the methods used by this application.
 */
export class Api<
	SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
	account = {
		/**
		 * No description
		 *
		 * @tags account
		 * @name GetStateInstance
		 * @summary Получить состояние инстанса
		 * @request GET:/waInstance{idInstance}/getStateInstance/{apiTokenInstance}
		 */
		getStateInstance: (
			idInstance: string,
			apiTokenInstance: string,
			params: RequestParams = {}
		) =>
			this.request<GetStateInstanceResponse, any>({
				path: `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
				method: "GET",
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags account
		 * @name GetSettings
		 * @summary Получить настройки инстанса
		 * @request GET:/waInstance{idInstance}/getSettings/{apiTokenInstance}
		 */
		getSettings: (
			idInstance: string,
			apiTokenInstance: string,
			params: RequestParams = {}
		) =>
			this.request<GetSettingsResponse, any>({
				path: `/waInstance${idInstance}/getSettings/${apiTokenInstance}`,
				method: "GET",
				format: "json",
				...params,
			}),
	};
	service = {
		/**
		 * No description
		 *
		 * @tags service
		 * @name CheckAccount
		 * @summary Проверить наличие МАХ
		 * @request POST:/waInstance{idInstance}/checkAccount/{apiTokenInstance}
		 */
		checkAccount: (
			idInstance: string,
			apiTokenInstance: string,
			data: CheckAccountRequest,
			params: RequestParams = {}
		) =>
			this.request<CheckAccountResponse, any>({
				path: `/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
				method: "POST",
				body: data,
				type: "application/json",
				format: "json",
				...params,
			}),

		/**
		 * @description Documented by GREEN-API but absent from the vendored Postman collection.
		 *
		 * @tags service
		 * @name GetChats
		 * @summary Получить список чатов
		 * @request GET:/waInstance{idInstance}/getChats/{apiTokenInstance}
		 */
		getChats: (
			idInstance: string,
			apiTokenInstance: string,
			params: RequestParams = {}
		) =>
			this.request<GetChatsResponse, any>({
				path: `/waInstance${idInstance}/getChats/${apiTokenInstance}`,
				method: "GET",
				format: "json",
				...params,
			}),
	};
	sending = {
		/**
		 * No description
		 *
		 * @tags sending
		 * @name SendMessage
		 * @summary Отправить текст
		 * @request POST:/waInstance{idInstance}/sendMessage/{apiTokenInstance}
		 */
		sendMessage: (
			idInstance: string,
			apiTokenInstance: string,
			data: SendMessageRequest,
			params: RequestParams = {}
		) =>
			this.request<SendMessageResponse, any>({
				path: `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
				method: "POST",
				body: data,
				type: "application/json",
				format: "json",
				...params,
			}),
	};
	journals = {
		/**
		 * No description
		 *
		 * @tags journals
		 * @name GetChatHistory
		 * @summary Получить историю сообщений чата
		 * @request POST:/waInstance{idInstance}/getChatHistory/{apiTokenInstance}
		 */
		getChatHistory: (
			idInstance: string,
			apiTokenInstance: string,
			data: GetChatHistoryRequest,
			params: RequestParams = {}
		) =>
			this.request<GetChatHistoryResponse, any>({
				path: `/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
				method: "POST",
				body: data,
				type: "application/json",
				format: "json",
				...params,
			}),
	};
	receiving = {
		/**
		 * No description
		 *
		 * @tags receiving
		 * @name ReceiveNotification
		 * @summary Получить уведомление
		 * @request GET:/waInstance{idInstance}/receiveNotification/{apiTokenInstance}
		 */
		receiveNotification: (
			idInstance: string,
			apiTokenInstance: string,
			query?: {
				/**
				 * @min 5
				 * @max 60
				 * @default 5
				 */
				receiveTimeout?: number;
			},
			params: RequestParams = {}
		) =>
			this.request<ReceiveNotificationResponse, any>({
				path: `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
				method: "GET",
				query: query,
				format: "json",
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags receiving
		 * @name DeleteNotification
		 * @summary Удалить уведомление
		 * @request DELETE:/waInstance{idInstance}/deleteNotification/{apiTokenInstance}/{receiptId}
		 */
		deleteNotification: (
			idInstance: string,
			apiTokenInstance: string,
			receiptId: number,
			params: RequestParams = {}
		) =>
			this.request<DeleteNotificationResponse, any>({
				path: `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
				method: "DELETE",
				format: "json",
				...params,
			}),
	};
}
