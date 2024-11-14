import { FileSystemManager, getFileSystemManager } from "@tarojs/taro";
import { read, utils, write } from "xlsx";

export namespace PromiseLike {
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

	export async function writeFile(filePath: string, data: ArrayBuffer) {
		return new Promise<TaroGeneral.CallbackResult>((resolve, reject) => {
			getFileSystemManager().writeFile({
				filePath: filePath,
				data,
				encoding: "binary",
				success: resolve,
				fail: reject,
			});
		});
	}
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

export function getExcelFileByTableMatrix<T>(tableMatrix: T[]) {
	// 创建工作簿
	const workbook = utils.book_new();

	// 创建工作表
	const worksheet = utils.json_to_sheet(tableMatrix);

	// 将工作表添加到工作簿
	utils.book_append_sheet(workbook, worksheet, "Sheet1");

	// 将工作簿写入二进制字符串
	const result = write(workbook, { bookType: "xlsx", type: "binary" });

	// 将二进制字符串转换为ArrayBuffer
	const string2ArrayBuffer = (s) => {
		const buf = new ArrayBuffer(s.length);
		const view = new Uint8Array(buf);
		for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
		return buf;
	};

	const buffer = string2ArrayBuffer(result);

	return buffer;
}
