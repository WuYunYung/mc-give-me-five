import {
	Avatar,
	Cell,
	ConfigProvider,
	Input,
	PullRefresh,
} from "@taroify/core";
import { View } from "@tarojs/components";
import { NotesOutlined } from "@taroify/icons";
import { routePush } from "@/shared/route";
import { Group } from "@/api";
import { isNil } from "lodash-es";
import useStore from "@/shared/store";
import classNames from "classnames";
import { ActivityStatus, Theme } from "@/shared/constants";
import { maskPhoneNumber } from "@/shared/utils";
import { usePageScroll } from "@tarojs/taro";
import { useState } from "react";

definePageConfig({
	navigationBarTitleText: "我的",
	disableScroll: true,
	backgroundColor: Theme.Color.Background,
});

export default function User() {
	const { user, loadUser } = useStore();

	const { name = "访客", username, group, isAdmin, phone } = user || {};

	const hasBeenRegister = !isNil(user);

	const innerGroup = group as Group | undefined;

	const avatar = (
		<View className="flex justify-center items-center h-1s3 bg-primary-900 flex-col gap-2">
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

	const unregisterEntries = (
		<Cell.Group>
			<Cell
				title="注册"
				isLink
				icon={<NotesOutlined />}
				onClick={() => {
					routePush("/user/pages/register");
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
				title="学生管理"
				isLink
				onClick={() => routePush("/manage/pages/users/list")}
			/>
			<Cell
				title="注册管理"
				isLink
				onClick={() => routePush("/manage/pages/register/list")}
			/>
			<Cell
				title="新建活动"
				isLink
				onClick={() => routePush("/manage/pages/create-activity")}
			/>
		</>
	);

	const studentEntries = (
		<>
			<Cell
				title="待签到的活动"
				isLink
				onClick={() =>
					routePush("/activity/pages/activity-list", {
						status: ActivityStatus.unsigned,
					})
				}
			></Cell>
		</>
	);

	const commonBeforeEntries = (
		<>
			<Cell
				title="联系电话"
				isLink
				onClick={() => routePush("/user/pages/mobile")}
			>
				<Input
					readonly
					value={phone ? maskPhoneNumber(phone) : phone}
					placeholder="更换手机"
				/>
			</Cell>
		</>
	);

	const commonAfterEntries = (
		<>
			<Cell
				title="历史统计"
				isLink
				onClick={() => routePush("/user/pages/summary")}
			/>
		</>
	);

	const registerEntries = (
		<Cell.Group>
			{commonBeforeEntries}
			{isAdmin ? teacherEntries : studentEntries}
			{commonAfterEntries}
		</Cell.Group>
	);

	const content = (
		<View className="flex flex-col h-screen">
			{avatar}
			<View className="flex-1 bg-white">
				{hasBeenRegister ? registerEntries : unregisterEntries}
			</View>
		</View>
	);

	const [reachTop, setReachTop] = useState(true);
	const [loading, setLoading] = useState(false);

	usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0));

	return (
		<>
			<ConfigProvider
				theme={{
					pullRefreshHeadColor: Theme.Color.White,
					loadingColor: Theme.Color.White,
					loadingTextColor: Theme.Color.White,
				}}
			>
				<PullRefresh
					className="w-full bg-primary-900"
					loading={loading}
					reachTop={reachTop}
					onRefresh={async () => {
						setLoading(true);
						try {
							await loadUser();
						} finally {
							setLoading(false);
						}
					}}
				>
					{content}
				</PullRefresh>
			</ConfigProvider>
		</>
	);
}
