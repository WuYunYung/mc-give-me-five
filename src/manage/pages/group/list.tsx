import { manageGroupList } from "@/api";
import { View } from "@tarojs/components";
import Feeds from "@/components/Feeds";
import { Cell } from "@taroify/core";
import { routePush } from "@/shared/route";

definePageConfig({
	navigationBarTitleText: "班级管理",
});

export default function () {
	return (
		<View>
			<Feeds
				service={async (params) => {
					const { results = [] } = await manageGroupList(params);

					return results;
				}}
				renderContent={(list) => {
					return (
						<Cell.Group>
							{list.map((item) => (
								<Cell
									key={item.id}
									title={item.name}
									isLink
									brief={item.grade.name}
									align="center"
									onClick={() =>
										routePush("/manage/pages/group/form", {
											id: item.id,
										})
									}
								></Cell>
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
