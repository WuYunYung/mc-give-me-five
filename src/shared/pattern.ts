export namespace Pattern {
	/** 姓名 */
	export const name =
		/^[A-Za-z\u4e00-\u9fa5\u3400-\u4DBF\u20000-\u2A6DF]{2,10}$/;

	/** 学号 */
	export const userName = /^\d{6,10}$/;

	/** 电话 */
	export const mobile = /\d{11}/;
}
