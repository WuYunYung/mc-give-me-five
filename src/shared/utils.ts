export function maskPhoneNumber(number) {
	// 将数字转换为字符串，确保其为字符串格式
	let str = number.toString();

	// 使用正则表达式替换中间的数字为星号
	return str.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}
