import { Avatar, Cell } from "@taroify/core";
import { View } from "@tarojs/components";
import { NotesOutlined } from "@taroify/icons";
import { navigateTo } from "@tarojs/taro";

definePageConfig({
	navigationBarTitleText: "我的",
});

export default function User() {
	// TODO: 获取头像
	// TODO: 获取身份
	const avatar = (
		<View className="flex justify-center items-center h-1/3 bg-rose flex-col gap-4">
			<Avatar size="large" className="shadow-md">
				WW
			</Avatar>
			<View className="text-sm text-white">访客</View>
		</View>
	);

	const entries = (
		<Cell.Group>
			<Cell
				title="注册"
				isLink
				icon={<NotesOutlined />}
				onClick={() => {
					navigateTo({
						url: "/user/pages/identity",
					});
				}}
			/>
		</Cell.Group>
	);

	return (
		<View className="flex flex-col h-screen">
			{avatar}
			{entries}
		</View>
	);
}
