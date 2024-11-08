import {
	navigateTo,
	redirectTo,
	navigateBack,
	getCurrentPages,
	EventChannel,
} from "@tarojs/taro";
import { isFunction } from "lodash-es";
import queryString from "query-string";

type StringifyParams = Parameters<typeof queryString.stringify>[0];

const REFRESH_EVENT_KEY = "$shouldRefresh";

function routeMethodImpl(method: typeof navigateTo | typeof redirectTo) {
	function routeMethod(path: string, onShouldRefresh?: () => void): void;
	function routeMethod(path: string, query?: StringifyParams): void;
	function routeMethod(
		path: string,
		query: StringifyParams,
		onShouldRefresh?: () => void,
	): void;
	function routeMethod(
		path: string,
		query?: StringifyParams | (() => void),
		onShouldRefresh?: () => void,
	): void {
		let innerQuery = isFunction(query) ? undefined : query;

		method({
			url: queryString.stringifyUrl({
				url: path,
				query: innerQuery,
			}),
			events: {
				[REFRESH_EVENT_KEY]() {
					const callback = isFunction(query) ? query : onShouldRefresh;

					callback?.();
				},
			},
		});
	}

	return routeMethod;
}

export const routePush = routeMethodImpl(navigateTo);

export const routeRedirect = routeMethodImpl(redirectTo);

export const routeBack = (options?: {
	step?: number;
	shouldRefresh?: boolean;
}) => {
	const { step = 1, shouldRefresh = false } = options || {};

	if (shouldRefresh) {
		const pages = getCurrentPages();
		const current = pages.at(-1); /* 从堆栈中获取当前界面的属性 */
		const eventChannel = current?.getOpenerEventChannel() as EventChannel;
		eventChannel.emit(REFRESH_EVENT_KEY);
	}

	navigateBack({
		delta: step,
	});
};
