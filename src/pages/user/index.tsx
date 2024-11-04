import { Avatar, Cell } from "@taroify/core";
import { View } from "@tarojs/components";
import { NotesOutlined } from "@taroify/icons";
import { routePush } from "@/shared/route";

definePageConfig({
	navigationBarTitleText: "我的",
});

export default function User() {
	// TODO: 获取头像
	// TODO: 获取身份
	const avatar = (
		<View className="flex justify-center items-center h-1/3 bg-primary flex-col gap-4">
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
					routePush("/user/pages/identity");
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
