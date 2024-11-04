import { Avatar, Cell } from "@taroify/core";
import { View } from "@tarojs/components";
import { NotesOutlined } from "@taroify/icons";
import { routePush } from "@/shared/route";
import { useRequest } from "ahooks";
import { GroupUpdate, userProfileRead, UserProfileUpdate } from "@/api";
import { isNil } from "lodash-es";
import useStore from "@/shared/store";

definePageConfig({
	navigationBarTitleText: "我的",
});

export default function User() {
	const { user, setupUser } = useStore();

	useRequest(userProfileRead, {
		onSuccess(data) {
			const user = data as unknown as UserProfileUpdate | undefined; // TODO: 接口数据与swagger类型对不上，临时指鹿为马一下
			user && setupUser(user);
		},
	});

	const { name = "访客", username, group } = user || {};

	const registed = !isNil(user);

	// TODO: 获取身份
	const avatar = (
		<View className="flex justify-center items-center h-1/3 bg-primary-900 flex-col gap-4">
			<Avatar size="large" className="shadow-md">
				{name.slice(0, 2)}
			</Avatar>
			<View className="text-sm text-white">{name}</View>
		</View>
	);

	const unregistedEntries = (
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

	const teacherEntries = (
		<Cell.Group>
			<Cell title="名字">{name}</Cell>
			<Cell title="学号">{username}</Cell>
			<Cell title="班级">
				{(group as unknown as GroupUpdate | undefined)?.name}
			</Cell>
			<Cell title="我的班级" isLink />
			<Cell title="新建班级" isLink />
			<Cell
				title="新建活动"
				isLink
				onClick={() => routePush("/manage/pages/create-activity")}
			/>
			<Cell title="统计" isLink />
		</Cell.Group>
	);

	return (
		<View className="flex flex-col h-screen">
			{avatar}
			{registed ? teacherEntries : unregistedEntries}
		</View>
	);
}
