import axios from "axios";
import * as fs from "fs-extra";

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

		// TODO operationId 去重

		console.log(`数据已成功写入文件: ${outputPath}`);
	} catch (error) {
		console.error("请求失败:", error);
	}
}

export default fetchData;
