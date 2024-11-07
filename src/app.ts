import { PropsWithChildren } from "react";

import "./app.css";
import { registerInterceptors, registerAdapter } from "./shared/request";
import useStore from "./shared/store";
import { useMount } from "ahooks";

registerAdapter();
registerInterceptors();

function App({ children }: PropsWithChildren<any>) {
	const { loadUser } = useStore();

	useMount(() => {
		loadUser();
	});

	return children;
}

export default App;
