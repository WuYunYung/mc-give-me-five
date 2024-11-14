import { PropsWithChildren } from "react";

import "./app.css";
import { registerInterceptors, registerAdapter } from "./shared/request";
import useStore from "./shared/store";
import { useLaunch } from "@tarojs/taro";

registerAdapter();
registerInterceptors();

function App({ children }: PropsWithChildren<any>) {
	const { loadUser } = useStore();

	useLaunch(() => {
		loadUser();
	});

	return children;
}

export default App;
