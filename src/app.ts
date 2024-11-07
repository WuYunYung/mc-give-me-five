import { PropsWithChildren } from "react";

import "./app.css";
import { registerInterceptors, registerAdapter } from "./shared/request";

registerAdapter();
registerInterceptors();

function App({ children }: PropsWithChildren<any>) {
	return children;
}

export default App;
