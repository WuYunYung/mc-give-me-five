import { manageRegisterDelete, manageRegisterList } from "@/api";
import Feeds from "@/components/Feeds";
import { Avatar, Button, Cell, SwipeCell } from "@taroify/core";
import { useRouter, setNavigationBarTitle } from "@tarojs/taro";
import { useMount, useRequest } from "ahooks";
import { showLoading, hideLoading, showModal, showToast } from "@tarojs/taro";
import { DeleteOutlined } from "@taroify/icons";
import { routePush } from "@/shared/route";

// TODO: 接口更新后开启
const enableCreate = false;

definePageConfig({
	navigationBarTitleText: "注册管理",
});

// TODO: 班级下钻
export default function () {
	const { params } = useRouter<{
		groupId?: string;
		gradeId?: string;
		groupName?: string;
	}>();

	const { groupId, gradeId, groupName } = params;

	useMount(() => {
		groupName &&
			setNavigationBarTitle({ title: decodeURIComponent(groupName) });
	});

	const { runAsync: deleteRegister } = useRequest(manageRegisterDelete, {
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

	return (
		<Feeds
			service={async (params) => {
				const requestParams: Exclude<
					Parameters<typeof manageRegisterList>[0],
					undefined
				> = { ...params };

				if (gradeId) {
					requestParams.group__grade_id = gradeId;
				}

				if (groupId) {
					requestParams.group_id = groupId;
				}

				const { results = [] } = await manageRegisterList(requestParams);

				return results;
			}}
			renderContent={(list, { mutate, refresh }) => {
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
											routePush(
												"/manage/pages/register/form",
												{
													registerId: user.id,
												},
												refresh,
											)
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

												await deleteRegister(user.id!);

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
			enableCreate={enableCreate}
			onCreateClick={(_, { refresh }) => {
				routePush("/manage/pages/register/form", refresh);
			}}
		/>
	);
}
