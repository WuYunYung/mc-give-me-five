export function maskPhoneNumber(number) {
	// 将数字转换为字符串，确保其为字符串格式
	let str = number.toString();

	// 使用正则表达式替换中间的数字为星号
	return str.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

type Result<T> = [Error, null] | [null, T];

export function wrapPromiseWith<P extends any[], T>(
	fn: (...args: P) => Promise<T>,
): (...args: P) => Promise<Result<T>> {
	return async (...args: P) => {
		try {
			const result = await fn(...args); // 使用 async/await 调用原函数
			return [null, result]; // 成功时返回 [null, result]
		} catch (error) {
			return [error, null]; // 错误时返回 [error, null]
		}
	};
}
