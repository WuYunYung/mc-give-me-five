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

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
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

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://django-9h64-123700-7-1329444134.sh.run.tcloudbase.com/api",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
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
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
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
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title API
 * @version v1
 * @baseUrl http://django-9h64-123700-7-1329444134.sh.run.tcloudbase.com/api
 *
 * API文档
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  activity = {
    /**
     * No description
     *
     * @tags activity
     * @name ActivityList
     * @request GET:/activity/
     * @secure
     */
    activityList: (
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
      this.request<
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
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivityCountByType
     * @request GET:/activity/count_by_type/
     * @secure
     */
    activityCountByType: (
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
      this.request<
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
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivitySignin
     * @request GET:/activity/signin/
     * @secure
     */
    activitySignin: (
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
      this.request<
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
        path: `/activity/signin/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivityRead
     * @request GET:/activity/{id}/
     * @secure
     */
    activityRead: (id: number, params: RequestParams = {}) =>
      this.request<ActivityRead, any>({
        path: `/activity/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags activity
     * @name ActivityAttend
     * @request GET:/activity/{id}/attend/
     * @secure
     */
    activityAttend: (id: number, params: RequestParams = {}) =>
      this.request<ActivityRead, any>({
        path: `/activity/${id}/attend/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  manage = {
    /**
     * No description
     *
     * @tags manage
     * @name ManageActivityList
     * @request GET:/manage/activity/
     * @secure
     */
    manageActivityList: (
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
      this.request<
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
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageActivityCreate
     * @request POST:/manage/activity/
     * @secure
     */
    manageActivityCreate: (data: ActivityCreate, params: RequestParams = {}) =>
      this.request<ActivityCreate, any>({
        path: `/manage/activity/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageActivityRead
     * @request GET:/manage/activity/{id}/
     * @secure
     */
    manageActivityRead: (id: number, params: RequestParams = {}) =>
      this.request<ActivityRead, any>({
        path: `/manage/activity/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageActivityUpdate
     * @request PUT:/manage/activity/{id}/
     * @secure
     */
    manageActivityUpdate: (id: number, data: ActivityUpdate, params: RequestParams = {}) =>
      this.request<ActivityUpdate, any>({
        path: `/manage/activity/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageActivityPartialUpdate
     * @request PATCH:/manage/activity/{id}/
     * @secure
     */
    manageActivityPartialUpdate: (id: number, data: ActivityUpdate, params: RequestParams = {}) =>
      this.request<ActivityUpdate, any>({
        path: `/manage/activity/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageActivityDelete
     * @request DELETE:/manage/activity/{id}/
     * @secure
     */
    manageActivityDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/activity/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageActivityAttenderRead
     * @request GET:/manage/activity/{id}/attender/
     * @secure
     */
    manageActivityAttenderRead: (id: number, params: RequestParams = {}) =>
      this.request<ActivityRead, any>({
        path: `/manage/activity/${id}/attender/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageActivityAttenderCreate
     * @request POST:/manage/activity/{id}/attender/
     * @secure
     */
    manageActivityAttenderCreate: (id: number, data: ActivityCreate, params: RequestParams = {}) =>
      this.request<ActivityCreate, any>({
        path: `/manage/activity/${id}/attender/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageActivityAttenderDelete
     * @request DELETE:/manage/activity/{id}/attender/
     * @secure
     */
    manageActivityAttenderDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/activity/${id}/attender/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageActivityGenerateCode
     * @request GET:/manage/activity/{id}/generate_code/
     * @secure
     */
    manageActivityGenerateCode: (id: number, params: RequestParams = {}) =>
      this.request<ActivityRead, any>({
        path: `/manage/activity/${id}/generate_code/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageGradeList
     * @request GET:/manage/grade/
     * @secure
     */
    manageGradeList: (
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
      this.request<
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
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageGradeCreate
     * @request POST:/manage/grade/
     * @secure
     */
    manageGradeCreate: (data: Grade, params: RequestParams = {}) =>
      this.request<Grade, any>({
        path: `/manage/grade/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageGradeUpdate
     * @request PUT:/manage/grade/
     * @secure
     */
    manageGradeUpdate: (data: Grade, params: RequestParams = {}) =>
      this.request<Grade, any>({
        path: `/manage/grade/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageGradePartialUpdate
     * @request PATCH:/manage/grade/
     * @secure
     */
    manageGradePartialUpdate: (data: Grade, params: RequestParams = {}) =>
      this.request<Grade, any>({
        path: `/manage/grade/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageGradeDelete
     * @request DELETE:/manage/grade/
     * @secure
     */
    manageGradeDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/grade/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageGradeRead
     * @request GET:/manage/grade/{id}/
     * @secure
     */
    manageGradeRead: (id: number, params: RequestParams = {}) =>
      this.request<Grade, any>({
        path: `/manage/grade/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

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
    manageGradeUpdate2: (id: number, data: Grade, params: RequestParams = {}) =>
      this.request<Grade, any>({
        path: `/manage/grade/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

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
    manageGradePartialUpdate2: (id: number, data: Grade, params: RequestParams = {}) =>
      this.request<Grade, any>({
        path: `/manage/grade/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

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
    manageGradeDelete2: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/grade/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageGroupList
     * @request GET:/manage/group/
     * @secure
     */
    manageGroupList: (
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
      this.request<
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
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageGroupCreate
     * @request POST:/manage/group/
     * @secure
     */
    manageGroupCreate: (data: GroupUpdate, params: RequestParams = {}) =>
      this.request<GroupUpdate, any>({
        path: `/manage/group/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageGroupUpdate
     * @request PUT:/manage/group/
     * @secure
     */
    manageGroupUpdate: (data: Group, params: RequestParams = {}) =>
      this.request<Group, any>({
        path: `/manage/group/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageGroupPartialUpdate
     * @request PATCH:/manage/group/
     * @secure
     */
    manageGroupPartialUpdate: (data: Group, params: RequestParams = {}) =>
      this.request<Group, any>({
        path: `/manage/group/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageGroupDelete
     * @request DELETE:/manage/group/
     * @secure
     */
    manageGroupDelete: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/group/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageGroupRead
     * @request GET:/manage/group/{id}/
     * @secure
     */
    manageGroupRead: (id: number, params: RequestParams = {}) =>
      this.request<Group, any>({
        path: `/manage/group/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

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
    manageGroupUpdate2: (id: number, data: GroupUpdate, params: RequestParams = {}) =>
      this.request<GroupUpdate, any>({
        path: `/manage/group/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

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
    manageGroupPartialUpdate2: (id: number, data: GroupUpdate, params: RequestParams = {}) =>
      this.request<GroupUpdate, any>({
        path: `/manage/group/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

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
    manageGroupDelete2: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/group/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageRegisterList
     * @request GET:/manage/register/
     * @secure
     */
    manageRegisterList: (
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
      this.request<void, any>({
        path: `/manage/register/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageRegisterCreate
     * @request POST:/manage/register/
     * @secure
     */
    manageRegisterCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/register/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageRegisterBatchRegister
     * @request POST:/manage/register/batch-register/
     * @secure
     */
    manageRegisterBatchRegister: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/register/batch-register/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageRegisterRead
     * @request GET:/manage/register/{id}/
     * @secure
     */
    manageRegisterRead: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/register/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageRegisterUpdate
     * @request PUT:/manage/register/{id}/
     * @secure
     */
    manageRegisterUpdate: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/register/${id}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageRegisterPartialUpdate
     * @request PATCH:/manage/register/{id}/
     * @secure
     */
    manageRegisterPartialUpdate: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/register/${id}/`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageRegisterDelete
     * @request DELETE:/manage/register/{id}/
     * @secure
     */
    manageRegisterDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/register/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageUserList
     * @request GET:/manage/user/
     * @secure
     */
    manageUserList: (
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
      this.request<void, any>({
        path: `/manage/user/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageUserRead
     * @request GET:/manage/user/{id}/
     * @secure
     */
    manageUserRead: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/user/${id}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageUserUpdate
     * @request PUT:/manage/user/{id}/
     * @secure
     */
    manageUserUpdate: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/user/${id}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageUserPartialUpdate
     * @request PATCH:/manage/user/{id}/
     * @secure
     */
    manageUserPartialUpdate: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/user/${id}/`,
        method: "PATCH",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags manage
     * @name ManageUserDelete
     * @request DELETE:/manage/user/{id}/
     * @secure
     */
    manageUserDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/manage/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  sys = {
    /**
     * @description 获取删除文件的url : param file_id: 文件id的列表
     *
     * @tags sys
     * @name SysDeleteList
     * @request GET:/sys/delete/
     * @secure
     */
    sysDeleteList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/delete/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 获取下载文件的url : param file_id: 文件id的列表
     *
     * @tags sys
     * @name SysDownloadList
     * @request GET:/sys/download/
     * @secure
     */
    sysDownloadList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/download/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags sys
     * @name SysEnvList
     * @request GET:/sys/env/
     * @secure
     */
    sysEnvList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/env/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 获取服务器本地时间
     *
     * @tags sys
     * @name SysTimeList
     * @request GET:/sys/time/
     * @secure
     */
    sysTimeList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/time/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * @description 获取上传文件的url
     *
     * @tags sys
     * @name SysUploadList
     * @request GET:/sys/upload/
     * @secure
     */
    sysUploadList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/sys/upload/`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * @description 获取/修改当前用户信息
     *
     * @tags user
     * @name UserProfileRead
     * @request GET:/user/profile/
     * @secure
     */
    userProfileRead: (
      query?: {
        /** Number of results to return per page. */
        limit?: number;
        /** The initial index from which to return the results. */
        offset?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
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
      }),

    /**
     * @description 获取/修改当前用户信息
     *
     * @tags user
     * @name UserProfileUpdate
     * @request PUT:/user/profile/
     * @secure
     */
    userProfileUpdate: (data: UserProfileUpdate, params: RequestParams = {}) =>
      this.request<UserProfileUpdate, any>({
        path: `/user/profile/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRegister
     * @request POST:/user/register/
     * @secure
     */
    userRegister: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/user/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
