import { FileSystemManager, getFileSystemManager } from "@tarojs/taro";
import { read, utils } from "xlsx";

export async function readFile(
	filePath: string,
): Promise<FileSystemManager.ReadFileSuccessCallbackResult> {
	return new Promise((resolve, reject) => {
		getFileSystemManager().readFile({
			filePath: filePath,
			encoding: "binary",
			success: resolve,
			fail: reject,
		});
	});
}

export async function getTableMatrixByFile(fileBuffer: ArrayBuffer) {
	// 使用 xlsx 库来读取文件
	const workbook = read(fileBuffer, { type: "binary" });

	// 获取第一个工作表
	const worksheet = workbook.Sheets[workbook.SheetNames[0]];

	// 将工作表数据转换为二维数组（矩阵）
	const matrix: (string | number | boolean)[][] = utils.sheet_to_json(
		worksheet,
		{ header: 1 },
	);

	return matrix;
}
