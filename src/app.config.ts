export default defineAppConfig({
	pages: ["pages/index/index", "pages/history/index", "pages/user/index"],
	subPackages: [
		{
			root: "user",
			pages: ["pages/identity", "pages/register"],
		},
		{
			root: "activity",
			pages: ["pages/activitylist", "pages/activitydetail"],
		},
	],
	window: {
		backgroundTextStyle: "dark",
		navigationBarBackgroundColor: "#da137a",
		navigationBarTitleText: "GiveMeFive",
		navigationBarTextStyle: "white",
	},
	tabBar: {
		color: "#8a8a8a",
		selectedColor: "#930a41",
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
