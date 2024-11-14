import { PropsWithChildren } from "react";

import "./app.css";
import { registerInterceptors, registerAdapter } from "./shared/request";
import useStore from "./shared/store";
import {
	getUpdateManager,
	useLaunch,
	showModal,
	useDidShow,
} from "@tarojs/taro";

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

	useLaunch(() => {
		loadUser();
	});

	useDidShow(() => {
		checkUpdate();
	});

	return children;
}

export default App;
