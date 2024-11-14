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

export interface GradeSimple {
	/** ID */
	id?: number;
	/**
	 * 年级名
	 * @minLength 1
	 * @maxLength 50
	 */
	name: string;
}

export interface Group {
	/** ID */
	id?: number;
	grade: GradeSimple;
	/**
	 * 班级名
	 * @minLength 1
	 * @maxLength 50
	 */
	name: string;
}

export interface UserSimple {
	/** ID */
	id?: number;
	/**
	 * 学号
	 * @minLength 1
	 * @maxLength 15
	 */
	username: string;
	/**
	 * 姓名
	 * @minLength 1
	 * @maxLength 50
	 */
	name: string;
	/**
	 * 手机号
	 * @minLength 1
	 * @maxLength 11
	 */
	phone: string;
	group: Group;
}

export interface ActivityRead {
	/** ID */
	id?: number;
	/**
	 * 名称
	 * @minLength 1
	 * @maxLength 50
	 */
	name: string;
	/**
	 * 描述
	 * @minLength 1
	 * @maxLength 10240
	 */
	description: string;
	creator: UserSimple;
	/**
	 * 开始时间
	 * @format date-time
	 */
	start_time: string;
	/**
	 * 结束时间
	 * @format date-time
	 */
	end_time: string;
	/**
	 * 地点
	 * @minLength 1
	 * @maxLength 50
	 */
	location: string;
	/**
	 * 最大报名容量
	 * @min 0
	 * @max 4294967295
	 */
	capacity: number;
	/** 活动类别 */
	type: 0 | 1 | 2 | 3;
	/** Get attenders count */
	get_attenders_count: number;
}

export interface ActivityReadDetail {
	/** ID */
	id?: number;
	/**
	 * 名称
	 * @minLength 1
	 * @maxLength 50
	 */
	name: string;
	/**
	 * 描述
	 * @minLength 1
	 * @maxLength 10240
	 */
	description: string;
	creator: UserSimple;
	/**
	 * 开始时间
	 * @format date-time
	 */
	start_time: string;
	/**
	 * 结束时间
	 * @format date-time
	 */
	end_time: string;
	/**
	 * 地点
	 * @minLength 1
	 * @maxLength 50
	 */
	location: string;
	/**
	 * 最大报名容量
	 * @min 0
	 * @max 4294967295
	 */
	capacity: number;
	/** 活动类别 */
	type: 0 | 1 | 2 | 3;
	/** Get attenders count */
	get_attenders_count: number;
	/** Get signed attenders count */
	get_signed_attenders_count: number;
	/** Is attend */
	is_attend?: string;
	/** Is signed */
	is_signed?: string;
}

export interface ActivityCreate {
	/**
	 * 名称
	 * @minLength 1
	 * @maxLength 50
	 */
	name: string;
	/**
	 * 描述
	 * @minLength 1
	 * @maxLength 10240
	 */
	description: string;
	/**
	 * 开始时间
	 * @format date-time
	 */
	start_time: string;
	/**
	 * 结束时间
	 * @format date-time
	 */
	end_time: string;
	/**
	 * 地点
	 * @minLength 1
	 * @maxLength 50
	 */
	location: string;
	/**
	 * 最大报名容量
	 * @min 0
	 * @max 4294967295
	 */
	capacity: number;
	/** 活动类别 */
	type: 0 | 1 | 2 | 3;
	/** Creator */
	creator: number;
}

export interface ActivityUpdate {
	/**
	 * 名称
	 * @minLength 1
	 * @maxLength 50
	 */
	name: string;
	/**
	 * 描述
	 * @minLength 1
	 * @maxLength 10240
	 */
	description: string;
	/**
	 * 开始时间
	 * @format date-time
	 */
	start_time: string;
	/**
	 * 结束时间
	 * @format date-time
	 */
	end_time: string;
	/**
	 * 地点
	 * @minLength 1
	 * @maxLength 50
	 */
	location: string;
	/**
	 * 最大报名容量
	 * @min 0
	 * @max 4294967295
	 */
	capacity: number;
	/** 活动类别 */
	type: 0 | 1 | 2 | 3;
}

export interface Attender {
	/** ID */
	id?: number;
	user: UserSimple;
	/**
	 * 签到时间
	 * @format date-time
	 */
	sign_time?: string;
	/** 签到状态 */
	status?: boolean;
	/** 活动 */
	activity: number;
}

export interface AttenderCreate {
	/** @uniqueItems true */
	usernames: string[];
	/** Activity */
	activity: number;
	/**
	 * Status
	 * @default false
	 */
	status?: boolean;
}

export interface AttenderUpdate {
	/** Status */
	status: boolean;
}

export interface GroupSimple {
	/** ID */
	id?: number;
	/**
	 * 班级名
	 * @minLength 1
	 * @maxLength 50
	 */
	name: string;
}

export interface Grade {
	/** ID */
	id?: number;
	/**
	 * 年级名
	 * @minLength 1
	 * @maxLength 50
	 */
	name: string;
	groups?: GroupSimple[];
}

export interface GroupUpdate {
	/** ID */
	id?: number;
	/** Grade */
	grade: number;
	/**
	 * 班级名
	 * @minLength 1
	 * @maxLength 50
	 */
	name: string;
}

export interface Register {
	/** ID */
	id?: number;
	group: Group;
	/**
	 * 学号
	 * @minLength 1
	 * @maxLength 15
	 */
	username: string;
	/**
	 * 姓名
	 * @minLength 1
	 * @maxLength 20
	 */
	name: string;
}

export interface RegisterUpdate {
	/**
	 * Username
	 * @minLength 10
	 * @maxLength 10
	 */
	username: string;
	/**
	 * Name
	 * @minLength 2
	 * @maxLength 20
	 */
	name: string;
	/** Group */
	group: number;
}

export interface UserProfile {
	/** ID */
	id?: number;
	/**
	 * OpenID
	 * @minLength 1
	 * @maxLength 30
	 */
	openid: string;
	/**
	 * 学号
	 * @minLength 1
	 * @maxLength 15
	 */
	username: string;
	/**
	 * 姓名
	 * @minLength 1
	 * @maxLength 50
	 */
	name: string;
	/**
	 * 手机号
	 * @minLength 1
	 * @maxLength 11
	 */
	phone: string;
	/** 是否管理员 */
	isAdmin?: boolean;
	group: Group;
}

export interface UserProfileManageUpdate {
	/** ID */
	id?: number;
	/**
	 * OpenID
	 * @minLength 1
	 */
	openid?: string;
	/**
	 * 学号
	 * @minLength 1
	 * @maxLength 15
	 */
	username: string;
	/**
	 * 姓名
	 * @minLength 1
	 * @maxLength 50
	 */
	name: string;
	/**
	 * 手机号
	 * @minLength 1
	 * @maxLength 11
	 */
	phone: string;
	/** 是否管理员 */
	isAdmin?: boolean;
	/** Group */
	group: number;
}

export interface UserProfileUpdate {
	/** ID */
	id?: number;
	/**
	 * OpenID
	 * @minLength 1
	 */
	openid?: string;
	/**
	 * 学号
	 * @minLength 1
	 */
	username?: string;
	/**
	 * 姓名
	 * @minLength 1
	 */
	name?: string;
	/**
	 * 手机号
	 * @minLength 1
	 * @maxLength 11
	 */
	phone: string;
	/** 是否管理员 */
	isAdmin?: boolean;
	/** Group */
	group?: number | null;
}

export interface UserRegister {
	/** ID */
	id?: number;
	/**
	 * Username
	 * @minLength 10
	 * @maxLength 10
	 */
	username: string;
	/**
	 * Name
	 * @minLength 2
	 * @maxLength 20
	 */
	name: string;
	/**
	 * Phone
	 * @minLength 11
	 * @maxLength 11
	 */
	phone: string;
	/** Group */
	group?: number | null;
}

import type {
	AxiosInstance,
	AxiosRequestConfig,
	HeadersDefaults,
	ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
	extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseType;
	/** request body */
	body?: unknown;
}

export type RequestParams = Omit<
	FullRequestParams,
	"body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
	extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
	securityWorker?: (
		securityData: SecurityDataType | null,
	) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
	secure?: boolean;
	format?: ResponseType;
}

export enum ContentType {
	Json = "application/json",
	FormData = "multipart/form-data",
	UrlEncoded = "application/x-www-form-urlencoded",
	Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
	public instance: AxiosInstance;
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
	private secure?: boolean;
	private format?: ResponseType;

	constructor({
		securityWorker,
		secure,
		format,
		...axiosConfig
	}: ApiConfig<SecurityDataType> = {}) {
		this.instance = axios.create({
			...axiosConfig,
			baseURL:
				axiosConfig.baseURL ||
				"http://django-9h64-123700-7-1329444134.sh.run.tcloudbase.com/api",
		});
		this.secure = secure;
		this.format = format;
		this.securityWorker = securityWorker;
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected mergeRequestParams(
		params1: AxiosRequestConfig,
		params2?: AxiosRequestConfig,
	): AxiosRequestConfig {
		const method = params1.method || (params2 && params2.method);

		return {
			...this.instance.defaults,
			...params1,
			...(params2 || {}),
			headers: {
				...((method &&
					this.instance.defaults.headers[
						method.toLowerCase() as keyof HeadersDefaults
					]) ||
					{}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	protected stringifyFormItem(formItem: unknown) {
		if (typeof formItem === "object" && formItem !== null) {
			return JSON.stringify(formItem);
		} else {
			return `${formItem}`;
		}
	}

	protected createFormData(input: Record<string, unknown>): FormData {
		if (input instanceof FormData) {
			return input;
		}
		return Object.keys(input || {}).reduce((formData, key) => {
			const property = input[key];
			const propertyContent: any[] =
				property instanceof Array ? property : [property];

			for (const formItem of propertyContent) {
				const isFileType = formItem instanceof Blob || formItem instanceof File;
				formData.append(
					key,
					isFileType ? formItem : this.stringifyFormItem(formItem),
				);
			}

			return formData;
		}, new FormData());
	}

	public request = async <T = any, _E = any>({
		secure,
		path,
		type,
		query,
		format,
		body,
		...params
	}: FullRequestParams): Promise<T> => {
		const secureParams =
			((typeof secure === "boolean" ? secure : this.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const responseFormat = format || this.format || undefined;

		if (
			type === ContentType.FormData &&
			body &&
			body !== null &&
			typeof body === "object"
		) {
			body = this.createFormData(body as Record<string, unknown>);
		}

		if (
			type === ContentType.Text &&
			body &&
			body !== null &&
			typeof body !== "string"
		) {
			body = JSON.stringify(body);
		}

		return this.instance
			.request({
				...requestParams,
				headers: {
					...(requestParams.headers || {}),
					...(type ? { "Content-Type": type } : {}),
				},
				params: query,
				responseType: responseFormat,
				data: body,
				url: path,
			})
			.then((response) => response.data);
	};
}

/**
 * No description
 *
 * @tags activity
 * @name ActivityList
 * @request GET:/activity/
 * @secure
 */
export const activityList = (
	query?: {
		/** id__gt */
		id__gt?: string;
		/** id__gte */
		id__gte?: string;
		/** id__lt */
		id__lt?: string;
		/** id__lte */
		id__lte?: string;
		/** id__in */
		id__in?: string;
		/** id */
		id?: string;
		/** creator_id */
		creator_id?: string;
		/** type__in */
		type__in?: string;
		/** type */
		type?: "0" | "1" | "2" | "3";
		/** start_time */
		start_time?: string;
		/** end_time */
		end_time?: string;
		/** status */
		status?: string;
		/** A search term. */
		search?: string;
		/** Number of results to return per page. */
		limit?: number;
		/** The initial index from which to return the results. */
		offset?: number;
	},
	params: RequestParams = {},
) =>
	new HttpClient().request<
		{
			count: number;
			/** @format uri */
			next?: string | null;
			/** @format uri */
			previous?: string | null;
			results: ActivityRead[];
		},
		any
	>({
		path: `/activity/`,
		method: "GET",
		query: query,
		secure: true,
		format: "json",
		...params,
	});

/**
 * @description 按照类型统计活动数量
 *
 * @tags activity
 * @name ActivityCountByType
 * @request GET:/activity/count_by_type/
 * @secure
 */
export const activityCountByType = (
	query?: {
		/** id__gt */
		id__gt?: string;
		/** id__gte */
		id__gte?: string;
		/** id__lt */
		id__lt?: string;
		/** id__lte */
		id__lte?: string;
		/** id__in */
		id__in?: string;
		/** id */
		id?: string;
		/** creator_id */
		creator_id?: string;
		/** type__in */
		type__in?: string;
		/** type */
		type?: "0" | "1" | "2" | "3";
		/** start_time */
		start_time?: string;
		/** end_time */
		end_time?: string;
		/** status */
		status?: string;
		/** A search term. */
		search?: string;
		/** Number of results to return per page. */
		limit?: number;
		/** The initial index from which to return the results. */
		offset?: number;
	},
	params: RequestParams = {},
) =>
	new HttpClient().request<
		{
			count: number;
			/** @format uri */
			next?: string | null;
			/** @format uri */
			previous?: string | null;
			results: ActivityRead[];
		},
		any
	>({
		path: `/activity/count_by_type/`,
		method: "GET",
		query: query,
		secure: true,
		format: "json",
		...params,
	});

/**
 * @description 学生签到 : param code: 签到码
 *
 * @tags activity
 * @name ActivitySignin
 * @request GET:/activity/signin/
 * @secure
 */
// export const activitySignin = (
// 	query?: {
// 		/** id__gt */
// 		id__gt?: string;
// 		/** id__gte */
// 		id__gte?: string;
// 		/** id__lt */
// 		id__lt?: string;
// 		/** id__lte */
// 		id__lte?: string;
// 		/** id__in */
// 		id__in?: string;
// 		/** id */
// 		id?: string;
// 		/** creator_id */
// 		creator_id?: string;
// 		/** type__in */
// 		type__in?: string;
// 		/** type */
// 		type?: "0" | "1" | "2" | "3";
// 		/** start_time */
// 		start_time?: string;
// 		/** end_time */
// 		end_time?: string;
// 		/** status */
// 		status?: string;
// 		/** A search term. */
// 		search?: string;
// 		/** Number of results to return per page. */
// 		limit?: number;
// 		/** The initial index from which to return the results. */
// 		offset?: number;
// 	},
// 	params: RequestParams = {},
// ) =>
// 	new HttpClient().request<
// 		{
// 			count: number;
// 			/** @format uri */
// 			next?: string | null;
// 			/** @format uri */
// 			previous?: string | null;
// 			results: ActivityRead[];
// 		},
// 		any
// 	>({
// 		path: `/activity/signin/`,
// 		method: "GET",
// 		query: query,
// 		secure: true,
// 		format: "json",
// 		...params,
// 	});

export const activitySignin = (code: string, params: RequestParams = {}) =>
	new HttpClient().request<any>({
		path: `/activity/signin/?code=${code}`,
		method: "GET",
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags activity
 * @name ActivityRead
 * @request GET:/activity/{id}/
 * @secure
 */
export const activityRead = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<ActivityReadDetail, any>({
		path: `/activity/${id}/`,
		method: "GET",
		secure: true,
		format: "json",
		...params,
	});

/**
 * @description 参加活动
 *
 * @tags activity
 * @name ActivityAttend
 * @request GET:/activity/{id}/attend/
 * @secure
 */
export const activityAttend = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<ActivityRead, any>({
		path: `/activity/${id}/attend/`,
		method: "GET",
		secure: true,
		format: "json",
		...params,
	});

/**
 * @description 退出活动
 *
 * @tags activity
 * @name ActivityQuit
 * @request GET:/activity/{id}/quit/
 * @secure
 */
export const activityQuit = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<ActivityRead, any>({
		path: `/activity/${id}/quit/`,
		method: "GET",
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageActivityList
 * @request GET:/manage/activity/
 * @secure
 */
export const manageActivityList = (
	query?: {
		/** id__gt */
		id__gt?: string;
		/** id__gte */
		id__gte?: string;
		/** id__lt */
		id__lt?: string;
		/** id__lte */
		id__lte?: string;
		/** id__in */
		id__in?: string;
		/** id */
		id?: string;
		/** creator_id */
		creator_id?: string;
		/** type__in */
		type__in?: string;
		/** type */
		type?: "0" | "1" | "2" | "3";
		/** start_time */
		start_time?: string;
		/** end_time */
		end_time?: string;
		/** status */
		status?: string;
		/** A search term. */
		search?: string;
		/** Number of results to return per page. */
		limit?: number;
		/** The initial index from which to return the results. */
		offset?: number;
	},
	params: RequestParams = {},
) =>
	new HttpClient().request<
		{
			count: number;
			/** @format uri */
			next?: string | null;
			/** @format uri */
			previous?: string | null;
			results: ActivityRead[];
		},
		any
	>({
		path: `/manage/activity/`,
		method: "GET",
		query: query,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageActivityCreate
 * @request POST:/manage/activity/
 * @secure
 */
export const manageActivityCreate = (
	data: ActivityCreate,
	params: RequestParams = {},
) =>
	new HttpClient().request<ActivityCreate, any>({
		path: `/manage/activity/`,
		method: "POST",
		body: data,
		secure: true,
		type: ContentType.Json,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageActivityRead
 * @request GET:/manage/activity/{id}/
 * @secure
 */
export const manageActivityRead = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<ActivityRead, any>({
		path: `/manage/activity/${id}/`,
		method: "GET",
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageActivityUpdate
 * @request PUT:/manage/activity/{id}/
 * @secure
 */
export const manageActivityUpdate = (
	id: number,
	data: ActivityUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<ActivityUpdate, any>({
		path: `/manage/activity/${id}/`,
		method: "PUT",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageActivityPartialUpdate
 * @request PATCH:/manage/activity/{id}/
 * @secure
 */
export const manageActivityPartialUpdate = (
	id: number,
	data: ActivityUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<ActivityUpdate, any>({
		path: `/manage/activity/${id}/`,
		method: "PATCH",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageActivityDelete
 * @request DELETE:/manage/activity/{id}/
 * @secure
 */
export const manageActivityDelete = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/manage/activity/${id}/`,
		method: "DELETE",
		secure: true,
		...params,
	});

/**
 * @description 管理员生成签到码, 每次生成都会覆盖之前的签到码 : param ttl: 有效时间, 单位秒, 默认10秒
 *
 * @tags manage
 * @name ManageActivityGenerateCode
 * @request GET:/manage/activity/{id}/generate_code/
 * @secure
 */
export const manageActivityGenerateCode = (id: number, ttl: number = 10) =>
	new HttpClient().request<ActivityRead, any>({
		path: `/manage/activity/${id}/generate_code/?ttl=${ttl}`,
		method: "GET",
		secure: true,
		format: "json",
		// ...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageAttenderList
 * @request GET:/manage/attender/
 * @secure
 */
export const manageAttenderList = (
	query?: {
		/** activity_id */
		activity_id?: string;
		/** A search term. */
		search?: string;
		/** Number of results to return per page. */
		limit?: number;
		/** The initial index from which to return the results. */
		offset?: number;
	},
	params: RequestParams = {},
) =>
	new HttpClient().request<
		{
			count: number;
			/** @format uri */
			next?: string | null;
			/** @format uri */
			previous?: string | null;
			results: Attender[];
		},
		any
	>({
		path: `/manage/attender/`,
		method: "GET",
		query: query,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageAttenderCreate
 * @request POST:/manage/attender/
 * @secure
 */
export const manageAttenderCreate = (
	data: AttenderCreate,
	params: RequestParams = {},
) =>
	new HttpClient().request<AttenderCreate, any>({
		path: `/manage/attender/`,
		method: "POST",
		body: data,
		secure: true,
		type: ContentType.Json,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageAttenderRead
 * @request GET:/manage/attender/{id}/
 * @secure
 */
export const manageAttenderRead = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<Attender, any>({
		path: `/manage/attender/${id}/`,
		method: "GET",
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageAttenderUpdate
 * @request PUT:/manage/attender/{id}/
 * @secure
 */
export const manageAttenderUpdate = (
	id: number,
	data: AttenderUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<AttenderUpdate, any>({
		path: `/manage/attender/${id}/`,
		method: "PUT",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageAttenderPartialUpdate
 * @request PATCH:/manage/attender/{id}/
 * @secure
 */
export const manageAttenderPartialUpdate = (
	id: number,
	data: AttenderUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<AttenderUpdate, any>({
		path: `/manage/attender/${id}/`,
		method: "PATCH",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageAttenderDelete
 * @request DELETE:/manage/attender/{id}/
 * @secure
 */
export const manageAttenderDelete = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/manage/attender/${id}/`,
		method: "DELETE",
		secure: true,
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGradeList
 * @request GET:/manage/grade/
 * @secure
 */
export const manageGradeList = (
	query?: {
		/** A search term. */
		search?: string;
		/** Number of results to return per page. */
		limit?: number;
		/** The initial index from which to return the results. */
		offset?: number;
	},
	params: RequestParams = {},
) =>
	new HttpClient().request<
		{
			count: number;
			/** @format uri */
			next?: string | null;
			/** @format uri */
			previous?: string | null;
			results: Grade[];
		},
		any
	>({
		path: `/manage/grade/`,
		method: "GET",
		query: query,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGradeCreate
 * @request POST:/manage/grade/
 * @secure
 */
export const manageGradeCreate = (data: Grade, params: RequestParams = {}) =>
	new HttpClient().request<Grade, any>({
		path: `/manage/grade/`,
		method: "POST",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGradeUpdate
 * @request PUT:/manage/grade/
 * @secure
 */
export const manageGradeUpdate = (data: Grade, params: RequestParams = {}) =>
	new HttpClient().request<Grade, any>({
		path: `/manage/grade/`,
		method: "PUT",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGradePartialUpdate
 * @request PATCH:/manage/grade/
 * @secure
 */
export const manageGradePartialUpdate = (
	data: Grade,
	params: RequestParams = {},
) =>
	new HttpClient().request<Grade, any>({
		path: `/manage/grade/`,
		method: "PATCH",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGradeDelete
 * @request DELETE:/manage/grade/
 * @secure
 */
export const manageGradeDelete = (params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/manage/grade/`,
		method: "DELETE",
		secure: true,
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGradeRead
 * @request GET:/manage/grade/{id}/
 * @secure
 */
export const manageGradeRead = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<Grade, any>({
		path: `/manage/grade/${id}/`,
		method: "GET",
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGradeUpdate2
 * @request PUT:/manage/grade/{id}/
 * @originalName manageGradeUpdate
 * @duplicate
 * @secure
 */
export const manageGradeUpdate2 = (
	id: number,
	data: Grade,
	params: RequestParams = {},
) =>
	new HttpClient().request<Grade, any>({
		path: `/manage/grade/${id}/`,
		method: "PUT",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGradePartialUpdate2
 * @request PATCH:/manage/grade/{id}/
 * @originalName manageGradePartialUpdate
 * @duplicate
 * @secure
 */
export const manageGradePartialUpdate2 = (
	id: number,
	data: Grade,
	params: RequestParams = {},
) =>
	new HttpClient().request<Grade, any>({
		path: `/manage/grade/${id}/`,
		method: "PATCH",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGradeDelete2
 * @request DELETE:/manage/grade/{id}/
 * @originalName manageGradeDelete
 * @duplicate
 * @secure
 */
export const manageGradeDelete2 = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/manage/grade/${id}/`,
		method: "DELETE",
		secure: true,
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGroupList
 * @request GET:/manage/group/
 * @secure
 */
export const manageGroupList = (
	query?: {
		/** grade__id */
		grade__id?: string;
		/** grade__name */
		grade__name?: string;
		/** A search term. */
		search?: string;
		/** Number of results to return per page. */
		limit?: number;
		/** The initial index from which to return the results. */
		offset?: number;
	},
	params: RequestParams = {},
) =>
	new HttpClient().request<
		{
			count: number;
			/** @format uri */
			next?: string | null;
			/** @format uri */
			previous?: string | null;
			results: Group[];
		},
		any
	>({
		path: `/manage/group/`,
		method: "GET",
		query: query,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGroupCreate
 * @request POST:/manage/group/
 * @secure
 */
export const manageGroupCreate = (
	data: GroupUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<GroupUpdate, any>({
		path: `/manage/group/`,
		method: "POST",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGroupUpdate
 * @request PUT:/manage/group/
 * @secure
 */
export const manageGroupUpdate = (data: Group, params: RequestParams = {}) =>
	new HttpClient().request<Group, any>({
		path: `/manage/group/`,
		method: "PUT",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGroupPartialUpdate
 * @request PATCH:/manage/group/
 * @secure
 */
export const manageGroupPartialUpdate = (
	data: Group,
	params: RequestParams = {},
) =>
	new HttpClient().request<Group, any>({
		path: `/manage/group/`,
		method: "PATCH",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGroupDelete
 * @request DELETE:/manage/group/
 * @secure
 */
export const manageGroupDelete = (params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/manage/group/`,
		method: "DELETE",
		secure: true,
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGroupRead
 * @request GET:/manage/group/{id}/
 * @secure
 */
export const manageGroupRead = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<Group, any>({
		path: `/manage/group/${id}/`,
		method: "GET",
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGroupUpdate2
 * @request PUT:/manage/group/{id}/
 * @originalName manageGroupUpdate
 * @duplicate
 * @secure
 */
export const manageGroupUpdate2 = (
	id: number,
	data: GroupUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<GroupUpdate, any>({
		path: `/manage/group/${id}/`,
		method: "PUT",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGroupPartialUpdate2
 * @request PATCH:/manage/group/{id}/
 * @originalName manageGroupPartialUpdate
 * @duplicate
 * @secure
 */
export const manageGroupPartialUpdate2 = (
	id: number,
	data: GroupUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<GroupUpdate, any>({
		path: `/manage/group/${id}/`,
		method: "PATCH",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageGroupDelete2
 * @request DELETE:/manage/group/{id}/
 * @originalName manageGroupDelete
 * @duplicate
 * @secure
 */
export const manageGroupDelete2 = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/manage/group/${id}/`,
		method: "DELETE",
		secure: true,
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageRegisterList
 * @request GET:/manage/register/
 * @secure
 */
export const manageRegisterList = (
	query?: {
		/** username */
		username?: string;
		/** username__in */
		username__in?: string;
		/** name */
		name?: string;
		/** name__in */
		name__in?: string;
		/** group_id */
		group_id?: string;
		/** group_id__in */
		group_id__in?: string;
		/** group__grade_id */
		group__grade_id?: string;
		/** group__grade_id__in */
		group__grade_id__in?: string;
		/** A search term. */
		search?: string;
		/** Number of results to return per page. */
		limit?: number;
		/** The initial index from which to return the results. */
		offset?: number;
	},
	params: RequestParams = {},
) =>
	new HttpClient().request<
		{
			count: number;
			/** @format uri */
			next?: string | null;
			/** @format uri */
			previous?: string | null;
			results: Register[];
		},
		any
	>({
		path: `/manage/register/`,
		method: "GET",
		query: query,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageRegisterCreate
 * @request POST:/manage/register/
 * @secure
 */
export const manageRegisterCreate = (
	data: RegisterUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<RegisterUpdate, any>({
		path: `/manage/register/`,
		method: "POST",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * @description 用户信息批量导入注册 : param username: 学号列表 : param name: 姓名列表 : param group: Group ID列表
 *
 * @tags manage
 * @name ManageRegisterBatchRegister
 * @request POST:/manage/register/batch-register/
 * @secure
 */
export const manageRegisterBatchRegister = (
	data: Register,
	params: RequestParams = {},
) =>
	new HttpClient().request<Register, any>({
		path: `/manage/register/batch-register/`,
		method: "POST",
		body: data,
		secure: true,
		type: ContentType.Json,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageRegisterRead
 * @request GET:/manage/register/{id}/
 * @secure
 */
export const manageRegisterRead = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<Register, any>({
		path: `/manage/register/${id}/`,
		method: "GET",
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageRegisterUpdate
 * @request PUT:/manage/register/{id}/
 * @secure
 */
export const manageRegisterUpdate = (
	id: number,
	data: RegisterUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<RegisterUpdate, any>({
		path: `/manage/register/${id}/`,
		method: "PUT",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageRegisterPartialUpdate
 * @request PATCH:/manage/register/{id}/
 * @secure
 */
export const manageRegisterPartialUpdate = (
	id: number,
	data: RegisterUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<RegisterUpdate, any>({
		path: `/manage/register/${id}/`,
		method: "PATCH",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageRegisterDelete
 * @request DELETE:/manage/register/{id}/
 * @secure
 */
export const manageRegisterDelete = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/manage/register/${id}/`,
		method: "DELETE",
		secure: true,
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageUserList
 * @request GET:/manage/user/
 * @secure
 */
export const manageUserList = (
	query?: {
		/** username */
		username?: string;
		/** username__in */
		username__in?: string;
		/** isAdmin */
		isAdmin?: string;
		/** id__gte */
		id__gte?: string;
		/** id__lte */
		id__lte?: string;
		/** id */
		id?: string;
		/** id__gt */
		id__gt?: string;
		/** id__lt */
		id__lt?: string;
		/** id__in */
		id__in?: string;
		/** group_id */
		group_id?: string;
		/** group_id__in */
		group_id__in?: string;
		/** group__grade_id */
		group__grade_id?: string;
		/** group__grade_id__in */
		group__grade_id__in?: string;
		/** A search term. */
		search?: string;
		/** Which field to use when ordering the results. */
		ordering?: string;
		/** Number of results to return per page. */
		limit?: number;
		/** The initial index from which to return the results. */
		offset?: number;
	},
	params: RequestParams = {},
) =>
	new HttpClient().request<
		{
			count: number;
			/** @format uri */
			next?: string | null;
			/** @format uri */
			previous?: string | null;
			results: UserProfile[];
		},
		any
	>({
		path: `/manage/user/`,
		method: "GET",
		query: query,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageUserRead
 * @request GET:/manage/user/{id}/
 * @secure
 */
export const manageUserRead = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<UserProfile, any>({
		path: `/manage/user/${id}/`,
		method: "GET",
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageUserUpdate
 * @request PUT:/manage/user/{id}/
 * @secure
 */
export const manageUserUpdate = (
	id: number,
	data: UserProfileManageUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<UserProfileManageUpdate, any>({
		path: `/manage/user/${id}/`,
		method: "PUT",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageUserPartialUpdate
 * @request PATCH:/manage/user/{id}/
 * @secure
 */
export const manageUserPartialUpdate = (
	id: number,
	data: UserProfileManageUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<UserProfileManageUpdate, any>({
		path: `/manage/user/${id}/`,
		method: "PATCH",
		body: data,
		secure: true,
		format: "json",
		...params,
	});

/**
 * No description
 *
 * @tags manage
 * @name ManageUserDelete
 * @request DELETE:/manage/user/{id}/
 * @secure
 */
export const manageUserDelete = (id: number, params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/manage/user/${id}/`,
		method: "DELETE",
		secure: true,
		...params,
	});

/**
 * @description 获取删除文件的url : param file_id: 文件id的列表
 *
 * @tags sys
 * @name SysDeleteList
 * @request GET:/sys/delete/
 * @secure
 */
export const sysDeleteList = (params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/sys/delete/`,
		method: "GET",
		secure: true,
		...params,
	});

/**
 * @description 获取下载文件的url : param file_id: 文件id的列表
 *
 * @tags sys
 * @name SysDownloadList
 * @request GET:/sys/download/
 * @secure
 */
export const sysDownloadList = (params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/sys/download/`,
		method: "GET",
		secure: true,
		...params,
	});

/**
 * No description
 *
 * @tags sys
 * @name SysEnvList
 * @request GET:/sys/env/
 * @secure
 */
export const sysEnvList = (params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/sys/env/`,
		method: "GET",
		secure: true,
		...params,
	});

/**
 * @description 获取服务器本地时间
 *
 * @tags sys
 * @name SysTimeList
 * @request GET:/sys/time/
 * @secure
 */
export const sysTimeList = (params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/sys/time/`,
		method: "GET",
		secure: true,
		...params,
	});

/**
 * @description 获取上传文件的url
 *
 * @tags sys
 * @name SysUploadList
 * @request GET:/sys/upload/
 * @secure
 */
export const sysUploadList = (params: RequestParams = {}) =>
	new HttpClient().request<void, any>({
		path: `/sys/upload/`,
		method: "GET",
		secure: true,
		...params,
	});

/**
 * @description 获取/修改当前用户信息
 *
 * @tags user
 * @name UserProfileRead
 * @request GET:/user/profile/
 * @secure
 */
export const userProfileRead = (
	query?: {
		/** Number of results to return per page. */
		limit?: number;
		/** The initial index from which to return the results. */
		offset?: number;
	},
	params: RequestParams = {},
) =>
	new HttpClient().request<
		{
			count: number;
			/** @format uri */
			next?: string | null;
			/** @format uri */
			previous?: string | null;
			results: UserProfileUpdate[];
		},
		any
	>({
		path: `/user/profile/`,
		method: "GET",
		query: query,
		secure: true,
		format: "json",
		...params,
	});

/**
 * @description 获取/修改当前用户信息
 *
 * @tags user
 * @name UserProfileUpdate
 * @request PUT:/user/profile/
 * @secure
 */
export const userProfileUpdate = (
	data: UserProfileUpdate,
	params: RequestParams = {},
) =>
	new HttpClient().request<UserProfileUpdate, any>({
		path: `/user/profile/`,
		method: "PUT",
		body: data,
		secure: true,
		type: ContentType.Json,
		format: "json",
		...params,
	});

/**
 * @description 用户注册 : param username: 学号 : param name: 姓名 : param phone: 手机号
 *
 * @tags user
 * @name UserRegister
 * @request POST:/user/register/
 * @secure
 */
export const userRegister = (data: UserRegister, params: RequestParams = {}) =>
	new HttpClient().request<UserRegister, any>({
		path: `/user/register/`,
		method: "POST",
		body: data,
		secure: true,
		type: ContentType.Json,
		format: "json",
		...params,
	});
