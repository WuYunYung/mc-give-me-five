import { manageGradeDelete2, manageGradeList } from "@/api";
import { View } from "@tarojs/components";
import { showLoading, hideLoading, showModal, showToast } from "@tarojs/taro";
import Feeds from "@/components/Feeds";
import { Button, Cell, SwipeCell } from "@taroify/core";
import { routePush } from "@/shared/route";
import { useRequest } from "ahooks";

definePageConfig({
	navigationBarTitleText: "年级管理",
});

export default function () {
	const { runAsync: deleteGrade } = useRequest(manageGradeDelete2, {
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
					const { results = [] } = await manageGradeList(params);

					return results;
				}}
				renderContent={(list, mutate) => {
					return (
						<Cell.Group>
							{list.map((grade, index) => (
								<SwipeCell key={grade.id}>
									<Cell
										title={grade.name}
										isLink
										clickable
										onClick={() =>
											routePush("/manage/pages/group/list", {
												gradeId: grade.id,
												gradeName: grade.name,
											})
										}
									>
										{grade.groups?.length}
									</Cell>
									<SwipeCell.Actions side="right">
										<Button
											variant="contained"
											shape="square"
											color="primary"
											onClick={() =>
												routePush("/manage/pages/grade/form", {
													gradeId: grade.id,
												})
											}
										>
											设置
										</Button>
										<Button
											variant="contained"
											shape="square"
											color="danger"
											onClick={async () => {
												const { confirm } = await showModal({
													content: `确定要删除 ${grade.name} 吗？`,
												});

												if (!confirm) return;

												await deleteGrade(grade.id!);

												mutate((list) => {
													list.splice(index, 1);
												});
											}}
										>
											删除
										</Button>
									</SwipeCell.Actions>
								</SwipeCell>
							))}
						</Cell.Group>
					);
				}}
				enableCreate
				onCreateClick={(e) => {
					e.stopPropagation();
					routePush("/manage/pages/grade/form");
				}}
			/>
		</View>
	);
}
