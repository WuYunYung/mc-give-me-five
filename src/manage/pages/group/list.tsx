import { manageGroupDelete2, manageGroupList } from "@/api";
import { View } from "@tarojs/components";
import Feeds from "@/components/Feeds";
import { Button, Cell, SwipeCell } from "@taroify/core";
import { routePush } from "@/shared/route";
import { useRouter, setNavigationBarTitle } from "@tarojs/taro";
import { useMount, useRequest } from "ahooks";
import { showLoading, hideLoading, showModal, showToast } from "@tarojs/taro";
import { DeleteOutlined, Edit } from "@taroify/icons";

definePageConfig({
	navigationBarTitleText: "班级管理",
	disableScroll: true,
});

export default function () {
	const { params } = useRouter<{
		gradeId?: string;
		gradeName?: string;
	}>();

	const { gradeId, gradeName } = params;

	useMount(() => {
		gradeName &&
			setNavigationBarTitle({ title: decodeURIComponent(gradeName) });
	});

	const { runAsync: deleteGroup } = useRequest(manageGroupDelete2, {
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
		<View>
			<Feeds
				service={async (params) => {
					const { results = [] } = await manageGroupList({
						...params,
						grade__id: gradeId,
					});

					return results;
				}}
				renderContent={(list, { mutate }) => {
					return (
						<Cell.Group>
							{list.map((group, index) => (
								<SwipeCell key={group.id}>
									<Cell
										key={group.id}
										title={group.name}
										isLink
										brief={group.grade.name}
										align="center"
										onClick={() =>
											routePush("/manage/pages/users/list", {
												groupId: group.id,
												gradeId,
												groupName: group.name,
											})
										}
									></Cell>
									<SwipeCell.Actions side="right">
										<Button
											className="h-full"
											variant="text"
											shape="square"
											color="primary"
											onClick={() =>
												routePush("/manage/pages/group/form", {
													groupId: group.id,
												})
											}
											icon={<Edit />}
										></Button>
										<Button
											className="h-full"
											variant="text"
											shape="square"
											color="primary"
											onClick={async () => {
												const { confirm } = await showModal({
													content: `确定要删除 ${group.name} 吗？`,
												});

												if (!confirm) return;

												await deleteGroup(group.id!);

												mutate((list) => {
													list.splice(index, 1);
												});
											}}
											icon={<DeleteOutlined />}
										></Button>
									</SwipeCell.Actions>
								</SwipeCell>
							))}
						</Cell.Group>
					);
				}}
				enableCreate
				onCreateClick={(e) => {
					e.stopPropagation();
					routePush("/manage/pages/group/form");
				}}
			/>
		</View>
	);
}
