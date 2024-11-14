import { PropsWithChildren } from "react";

import "./app.css";
import { registerInterceptors, registerAdapter } from "./shared/request";
import useStore from "./shared/store";
import { useLoad } from "@tarojs/taro";

registerAdapter();
registerInterceptors();

function App({ children }: PropsWithChildren<any>) {
	const { loadUser } = useStore();

	useLoad(() => {
		loadUser();
	});

	return children;
}

export default App;
