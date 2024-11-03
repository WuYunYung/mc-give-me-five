import { cloud, getStorageSync } from "@tarojs/taro";
import axios, { type AxiosAdapter } from "axios";

namespace CloudRequestConfig {
	export const CLOUD_ENV = "prod-0gefozow13dd7576";

	export const X_WX_SERVICE = "django-9h64";
}

type WechatCloudRequest = typeof cloud.callContainer;

type RequestParams = Parameters<WechatCloudRequest>[0];

type Methods = Exclude<RequestParams["method"], undefined>;

cloud.init({
	env: CloudRequestConfig.CLOUD_ENV,
});

type Config = Parameters<AxiosAdapter>[0];

type FulfilledHandler = (innerConfig: Config) => Config | Promise<Config>;

async function getWrappedConfig(config: Config) {
	const handlers: FulfilledHandler[] = [];

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
		handler.fulfilled && handlers.push(handler.fulfilled);
	});

	let innerConfig = config;

	for (const handler of handlers) {
		innerConfig = await handler(innerConfig);
	}

	return innerConfig;
}

const adapter: AxiosAdapter = async (config) => {
	const wrappedConfig = await getWrappedConfig(config);

	const {
		params,
		url = "",
		method = "get",
		headers,
		responseType,
		timeout,
	} = wrappedConfig;

	const { data, statusCode, header } = await cloud.callContainer({
		get path() {
			return "/api" + url;
		},
		get method() {
			const cloudMethod = method?.toUpperCase() as Methods;
			return cloudMethod;
		},
		data: params,
		get header() {
			console.log("header", {
				headers,
				json: headers.toJSON(),
			});

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

	return {
		data,
		status: statusCode,
		headers: header,
		config,
		statusText: "",
	};
};

axios.defaults.adapter = adapter;

axios.interceptors.request.use((config) => {
	console.log("interceptors.request", config);

	const token = getStorageSync("token");
	if (token) {
		config.headers["Authorization"] = `bearer ${token}`;
	}

	config.headers["Content-Type"] = "application/json";
	config.headers["X-WX-SERVICE"] = CloudRequestConfig.X_WX_SERVICE;

	return config;
});

// TODO auto login
