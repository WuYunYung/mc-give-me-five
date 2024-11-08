import { manageGradeList } from "@/api";
import { View } from "@tarojs/components";
import Feeds from "@/components/Feeds";
import { Button, Cell, SwipeCell } from "@taroify/core";
import { routePush } from "@/shared/route";

definePageConfig({
	navigationBarTitleText: "年级管理",
});

export default function () {
	return (
		<View>
			<Feeds
				service={async (params) => {
					const { results = [] } = await manageGradeList(params);

					return results;
				}}
				renderContent={(list) => {
					return (
						<Cell.Group>
							{list.map((grade) => (
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
