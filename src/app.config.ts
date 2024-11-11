import { Theme } from "./shared/constants";

export default defineAppConfig({
	entryPagePath: "pages/index/index",
	pages: ["pages/index/index", "pages/history/index", "pages/user/index"],
	subPackages: [
		{
			root: "user",
			pages: [
				"pages/identity",
				"pages/register",
				"pages/summary",
				"pages/mobile",
				"pages/detail",
			],
		},
		{
			root: "activity",
			pages: ["pages/activity-list"],
		},
		{
			root: "history",
			pages: ["pages/history-detail", ...["pages/detail/detail-qrcode"]],
		},
		{
			root: "manage",
			pages: [
				"pages/create-activity",
				"pages/create-classes",
				...["pages/grade/list", "pages/grade/form"],
				...["pages/group/list", "pages/group/form"],
				...["pages/users/list"],
				...["pages/register/list", "pages/register/form"],
			],
		},
		{
			root: "feature",
			pages: [
				"pages/group-import-users",
				"pages/history-detail-import",
				"pages/history-detail-attender",
			],
		},
	],
	window: {
		backgroundTextStyle: "dark",
		navigationBarBackgroundColor: Theme.Color.Primary,
		navigationBarTitleText: "GiveMeFive",
		navigationBarTextStyle: "white",
	},
	tabBar: {
		color: "#8a8a8a",
		selectedColor: Theme.Color.Primary,
		backgroundColor: "#fafafa",
		borderStyle: "black",
		list: [
			{
				pagePath: "pages/index/index",
				iconPath: "./static/tabBar/home_default.png",
				selectedIconPath: "./static/tabBar/home.png",
				text: "首页",
			},
			{
				pagePath: "pages/history/index",
				iconPath: "./static/tabBar/history_default.png",
				selectedIconPath: "./static/tabBar/history.png",
				text: "历史",
			},
			{
				pagePath: "pages/user/index",
				iconPath: "./static/tabBar/user_default.png",
				selectedIconPath: "./static/tabBar/user.png",
				text: "我的",
			},
		],
	},
});
