import { PropsWithChildren } from "react";

import "./app.css";
import { registerInterceptors, registerAdapter } from "./shared/request";
import useStore from "./shared/store";
import { getUpdateManager, showModal, useDidShow } from "@tarojs/taro";
import { useRequest } from "ahooks";
import useBackShow from "./hooks/useBackShow";
import { AxiosError } from "axios";

registerAdapter();
registerInterceptors();

function checkUpdate() {
	const updateManager = getUpdateManager();

	updateManager.onUpdateReady(() => {
		showModal({
			title: "更新提示",
			content: "新版本已经准备好，是否重启应用？",
			success(res) {
				if (res.confirm) {
					// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
					updateManager.applyUpdate();
				}
			},
		});
	});
}

function App({ children }: PropsWithChildren<any>) {
	const { loadUser } = useStore();

	const { refresh } = useRequest(
		async () => {
			const [error, user] = await loadUser();

			if (error ? (error as AxiosError)?.response?.status !== 403 : !user) {
				return Promise.reject();
			}
		},
		{
			retryCount: 5,
		},
	);

	useBackShow(() => {
		refresh();
	});

	useDidShow(() => {
		checkUpdate();
	});

	return children;
}

export default App;
