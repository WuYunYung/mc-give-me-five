import { PropsWithChildren } from "react";

import "./app.css";
import { registerInterceptors, registerAdapter } from "./shared/request";
import useStore from "./shared/store";
import { useDidShow } from "@tarojs/taro";

registerAdapter();
registerInterceptors();

function App({ children }: PropsWithChildren<any>) {
	const { loadUser } = useStore();

	useDidShow(() => {
		loadUser();
	});

	return children;
}

export default App;
