import { cloud, showToast, showModal } from "@tarojs/taro";
import axios, { AxiosResponse, type AxiosAdapter } from "axios";
import { debounce, inRange, isString } from "lodash-es";
import queryString from "query-string";
import { routeRedirect } from "./route";

namespace CloudRequestConfig {
	export const CLOUD_ENV = "prod-0gefozow13dd7576";

	export const X_WX_SERVICE = "django-9h64";
}

type WeChatCloudRequest = typeof cloud.callContainer;

type RequestParams = Parameters<WeChatCloudRequest>[0];

type Methods = Exclude<RequestParams["method"], undefined>;

cloud.init({
	env: CloudRequestConfig.CLOUD_ENV,
});

type Config = Parameters<AxiosAdapter>[0];

type FulfilledHandler = (innerConfig: Config) => Config | Promise<Config>;

type InterceptorsRequestHandler = {
	fulfilled?: FulfilledHandler;
	rejected?: (error: Error) => void;
};

function getInterceptorsRequestHandlers() {
	const handlers: InterceptorsRequestHandler[] = [];

	const manager = axios.interceptors.request;

	(
		manager as typeof manager & {
			forEach: (
				callback: (handler: {
					fulfilled?: FulfilledHandler;
				}) => void,
			) => void;
		}
	).forEach((handler) => {
		handler && handlers.push(handler);
	});

	return handlers;
}

async function getWrappedConfig(config: Config) {
	const handlers = getInterceptorsRequestHandlers();

	let innerConfig = config;

	for (const handler of handlers) {
		if (handler.fulfilled) {
			innerConfig = await handler.fulfilled(innerConfig);
		}
	}

	return innerConfig;
}

async function triggerRejection(error: Error) {
	const handlers = getInterceptorsRequestHandlers();

	await Promise.all(
		handlers.map(async (handler) => {
			if (handler.rejected) {
				await handler.rejected(error);
			}
		}),
	);
}

const adapter: AxiosAdapter = async (config) => {
	const wrappedConfig = await getWrappedConfig(config);

	const {
		data: configData,
		url = "",
		method = "get",
		headers,
		responseType,
		timeout,
		params,
	} = wrappedConfig;

	const { data, statusCode, header } = await cloud.callContainer({
		get path() {
			const uri = `/api${url}`;

			return queryString.stringifyUrl({ url: uri, query: params });
		},
		get method() {
			const cloudMethod = method?.toUpperCase() as Methods;
			return cloudMethod;
		},
		get data() {
			if (isString(configData)) {
				return JSON.parse(configData);
			}

			return configData;
		},
		get header() {
			return headers.toJSON();
		},
		timeout,
		get responseType() {
			switch (responseType) {
				case "arraybuffer":
				case "text":
					return responseType;
				default:
					return undefined;
			}
		},
	});

	const response: AxiosResponse = {
		data,
		status: statusCode,
		headers: header,
		config,
		statusText: "",
	};

	if (!inRange(response.status, 200, 299)) {
		const error: Error & {
			response?: typeof response;
		} = new Error(data.message || data.detail);

		error.response = response;

		await triggerRejection(error);

		return Promise.reject(error);
	}
	return response;
};

export function registerAdapter() {
	axios.defaults.adapter = adapter;
}

export function registerInterceptors() {
	const gotoRegister = debounce(
		() => routeRedirect("/user/pages/register"),
		200,
	);

	axios.interceptors.request.use(
		(config) => {
			config.headers["Content-Type"] = "application/json";
			config.headers["X-WX-SERVICE"] = CloudRequestConfig.X_WX_SERVICE;

			return config;
		},
		(error) => {
			const { response } = error;

			if (response.status === 403) {
				return gotoRegister();
			}

			if (error.message) {
				if (error.message.length <= 6) {
					showToast({
						title: error.message,
						icon: "error",
					});
				} else {
					showModal({
						content: error.message,
					});
				}
			}
		},
	);
}
