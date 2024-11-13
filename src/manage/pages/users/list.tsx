import { manageUserDelete, manageUserList } from "@/api";
import Feeds from "@/components/Feeds";
import { routePush } from "@/shared/route";
import { Avatar, Button, Cell, SwipeCell, Tabs } from "@taroify/core";
import { useRouter, setNavigationBarTitle } from "@tarojs/taro";
import { useMount, useRequest } from "ahooks";
import { showLoading, hideLoading, showModal, showToast } from "@tarojs/taro";
import { DeleteOutlined } from "@taroify/icons";
import RegisterEntries from "../../components/RegisterEntries";
import { useMemo } from "react";

definePageConfig({
	navigationBarTitleText: "学生管理",
	disableScroll: true,
});

export default function () {
	const { params } = useRouter<{
		groupId?: string;
		gradeId?: string;
		groupName?: string;
	}>();

	const { groupId, gradeId, groupName } = params;

	const innerGroupName = useMemo(
		() => (groupName ? decodeURIComponent(groupName) : ""),
		[groupName],
	);

	useMount(() => {
		if (!innerGroupName) return;
		setNavigationBarTitle({
			get title() {
				const baseName = decodeURIComponent(innerGroupName);

				return baseName;
			},
		});
	});

	const { runAsync: deleteUser } = useRequest(manageUserDelete, {
		manual: true,
		onBefore() {
			showLoading();
		},
		onFinally() {
			hideLoading();
		},
		onSuccess() {
			showToast({
				title: "删除成功",
				icon: "success",
			});
		},
	});

	const getFeeds = (params: { isAdmin: boolean }) => {
		const { isAdmin } = params;

		return (
			<Feeds
				service={async (params) => {
					const requestParams: Exclude<
						Parameters<typeof manageUserList>[0],
						undefined
					> = { ...params, isAdmin: isAdmin ? "true" : "false" };

					if (gradeId) {
						requestParams.group__grade_id = gradeId;
					}

					if (groupId) {
						requestParams.group_id = groupId;
					}

					const { results = [] } = await manageUserList(requestParams);

					return results;
				}}
				renderContent={(list, { mutate }) => {
					return (
						<Cell.Group>
							{list.map((user, index) => {
								return (
									<SwipeCell key={user.id}>
										<Cell
											title={user.name}
											brief={user.username}
											icon={
												<Avatar className="mr-2">
													{user.name.at(0)?.toUpperCase()}
												</Avatar>
											}
											align="center"
											onClick={() =>
												routePush("/user/pages/detail", {
													userId: user.id,
												})
											}
										>
											{user.group.name}
										</Cell>
										<SwipeCell.Actions side="right">
											<Button
												className="h-full"
												variant="text"
												shape="square"
												color="primary"
												onClick={async () => {
													const { confirm } = await showModal({
														content: `确定要删除 ${user.name} 吗？`,
													});

													if (!confirm) return;

													await deleteUser(user.id!);

													mutate((list) => {
														list.splice(index, 1);
													});
												}}
												icon={<DeleteOutlined />}
											></Button>
										</SwipeCell.Actions>
									</SwipeCell>
								);
							})}
						</Cell.Group>
					);
				}}
			/>
		);
	};

	const tabs = (
		<Tabs animated>
			<Tabs.TabPane title="学生">{getFeeds({ isAdmin: false })}</Tabs.TabPane>
			<Tabs.TabPane title="管理员">{getFeeds({ isAdmin: true })}</Tabs.TabPane>
		</Tabs>
	);

	return (
		<>
			{tabs}
			<RegisterEntries groupId={groupId} groupName={innerGroupName} />
		</>
	);
}
