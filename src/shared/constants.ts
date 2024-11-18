export enum ActivityStatus {
	/** 已经报名的活动 */
	attend = "attend",
	/** 已经报名并且已经签到 */
	signed = "signed",
	running = "running",
	/** 已经报名但是没签到 */
	unsigned = "unsigned",
}

export namespace DateFormat {
	export const Remote = "YYYY-MM-DDThh:mm:ss";

	export const Display = "YYYY-MM-DD hh:mm";
}

export const PLACEHOLDER = "请输入";

export namespace Theme {
	export namespace Color {
		export const Primary = "#930a41";
		export const White = "#fff";
		export const Tabbar = "#fafafa";
		export const Background = White;
	}
}

export const DEFAULT_REQUEST_TIMEOUT = 5000;
