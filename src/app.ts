import { PropsWithChildren } from "react";

import "./app.css";
import "./shared/request";

function App({ children }: PropsWithChildren<any>) {
	return children;
}

export default App;
