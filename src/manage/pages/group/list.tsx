import { manageGroupList } from "@/api";
import { View } from "@tarojs/components";
import Feeds from "@/components/Feeds";
import { Button, Cell, SwipeCell } from "@taroify/core";
import { routePush } from "@/shared/route";
import { useRouter, setNavigationBarTitle } from "@tarojs/taro";
import { useMount } from "ahooks";

definePageConfig({
	navigationBarTitleText: "班级管理",
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
				renderContent={(list) => {
					return (
						<Cell.Group>
							{list.map((group) => (
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
											variant="contained"
											shape="square"
											color="primary"
											onClick={() =>
												routePush("/manage/pages/group/form", {
													groupId: group.id,
												})
											}
										>
											设置
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
					routePush("/manage/pages/group/form");
				}}
			/>
		</View>
	);
}
