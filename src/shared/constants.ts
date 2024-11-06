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
