import { generateApi } from "swagger-typescript-api";
import { SWAGGER_OUTPUT_PATH, SWAGGER_HEADERS, SWAGGER_URL } from "./constants";
import fetchData from "./utils/downloadFile";
import * as path from "node:path";

(async () => {
	await fetchData(SWAGGER_URL, SWAGGER_HEADERS, SWAGGER_OUTPUT_PATH);

	await generateApi({
		name: "api.ts",
		output: path.resolve(__dirname, "../../src/shared"),
		input: SWAGGER_OUTPUT_PATH,
		httpClientType: "axios",
		generateClient: true,
		templates: path.resolve(__dirname, "./templates"),
		singleHttpClient: true,
		unwrapResponseData: true,
	});
})();
