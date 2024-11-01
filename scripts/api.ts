import axios from "axios";
import * as fs from "fs-extra";
import * as path from "node:path";
import { generateApi } from "swagger-typescript-api";

async function fetchData(
	url: string,
	headers: Record<string, string>,
	outputPath: string,
) {
	try {
		// 发送请求
		const response = await axios.get(url, { headers });

		// 将响应的 JSON 数据写入指定文件
		await fs.outputFile(outputPath, JSON.stringify(response.data, null, 2));

		console.log(`数据已成功写入文件: ${outputPath}`);
	} catch (error) {
		console.error("请求失败:", error);
	}
}

// 示例使用
const url =
	"https://django-9h64-123700-7-1329444134.sh.run.tcloudbase.com/api/docs/?format=openapi"; // 替换为你的 URL
const headers = {
	Cookie:
		"csrftoken=Kci7cbpF5Q5U4Al5o34onoMl2ksIGkbb; sessionid=pp37bfdybgx7if5g7s03mrg6gwesr76z",
};
const outputPath = path.resolve(__dirname, "../output/swagger.json"); // 替换为你的文件路径

(async () => {
	await fetchData(url, headers, outputPath);

	generateApi({
		name: "api.ts",
		output: path.resolve(__dirname, "../assets"),
		input: outputPath,
		httpClientType: "axios",
		generateClient: true,
	});
})();
