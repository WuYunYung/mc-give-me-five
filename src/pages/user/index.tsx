import { Avatar, Cell, Switch } from "@taroify/core";
import { View } from "@tarojs/components";
import { NotesOutlined } from "@taroify/icons";
import { routePush } from "@/shared/route";
import { useRequest } from "ahooks";
import {
	Group,
	manageUserPartialUpdate,
	userProfileRead,
	UserProfileUpdate,
} from "@/api";
import { isNil } from "lodash-es";
import useStore from "@/shared/store";
import classNames from "classnames";
import { showLoading, hideLoading } from "@tarojs/taro";
import { ActivityStatus } from "@/shared/constants";

const isDev = process.env.NODE_ENV === "development";

definePageConfig({
	navigationBarTitleText: "我的",
});

export default function User() {
	const { user, setupUser } = useStore();

	const { refresh } = useRequest(userProfileRead, {
		onSuccess(data) {
			const user = data as unknown as UserProfileUpdate | undefined; // TODO: 接口数据与swagger类型对不上，临时指鹿为马一下
			user && setupUser(user);
		},
		onBefore() {
			showLoading();
		},
		onFinally() {
			hideLoading();
		},
	});

	const { name = "访客", username, group, isAdmin, id } = user || {};

	const registed = !isNil(user);

	const innerGroup = group as Group | undefined;

	// TODO: 获取身份
	const avatar = (
		<View className="flex justify-center items-center h-1/3 bg-primary-900 flex-col gap-2">
			<Avatar size="large">{name.at(0)?.toUpperCase()}</Avatar>
			<View className="text-sm text-white">{name}</View>
			<View
				className={classNames("text-xs text-white flex flex-col text-center", {
					"opacity-0": !user,
				})}
			>
				<View>{username}</View>
				<View>{`${innerGroup?.grade.name} ${innerGroup?.name}`}</View>
			</View>
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
		<>
			<Cell
				title="年级管理"
				isLink
				onClick={() => routePush("/manage/pages/grade/list")}
			/>
			<Cell
				title="班级管理"
				isLink
				onClick={() => routePush("/manage/pages/group/list")}
			/>
			<Cell
				title="新建活动"
				isLink
				onClick={() => routePush("/manage/pages/create-activity")}
			/>
		</>
	);

	const studenEntries = (
		<>
			<Cell
				title="待签到的活动"
				isLink
				onClick={() =>
					routePush("/activity/pages/activity-list", {
						status: ActivityStatus.unsigned,
						end_time: Date.now(),
					})
				}
			></Cell>
		</>
	);

	const { run: toggleAdmin, loading } = useRequest(
		() =>
			manageUserPartialUpdate(id!, {
				body: { isAdmin: !isAdmin },
			} as any),
		{
			ready: !isNil(id),
			manual: true,
			onSuccess() {
				refresh();
			},
		},
	);

	const commonEntries = (
		<>
			<Cell title="统计" isLink />
			{isDev && (
				<Cell title="切换身份" align="center" brief={isAdmin ? "老师" : "学生"}>
					<Switch checked={isAdmin} loading={loading} onChange={toggleAdmin} />
				</Cell>
			)}
		</>
	);

	const registedEntries = (
		<Cell.Group>
			{isAdmin ? teacherEntries : studenEntries}
			{commonEntries}
		</Cell.Group>
	);

	return (
		<View className="flex flex-col h-screen">
			{avatar}
			{registed ? registedEntries : unregistedEntries}
		</View>
	);
}
