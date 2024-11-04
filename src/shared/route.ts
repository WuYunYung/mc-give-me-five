import { navigateTo, redirectTo, navigateBack } from "@tarojs/taro";
import queryString from "query-string";

type StringifyParams = Parameters<typeof queryString.stringify>[0];

function routeMethodImpl(method: typeof navigateTo | typeof redirectTo) {
	return (path: string, query?: StringifyParams) => {
		method({
			url: queryString.stringifyUrl({
				url: path,
				query,
			}),
		});
	};
}

export const routePush = routeMethodImpl(navigateTo);

export const routeRedirect = routeMethodImpl(redirectTo);

export const routeBack = navigateBack;
