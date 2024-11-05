import { manageGradeList } from "@/api";
import { View } from "@tarojs/components";
import Feeds from "@/components/Feeds";
import { Cell } from "@taroify/core";
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
							{list.map((item) => (
								<Cell
									key={item.id}
									title={item.name}
									isLink
									clickable
									onClick={() =>
										routePush("/manage/pages/grade/form", {
											id: item.id,
										})
									}
								>
									{item.groups?.length}
								</Cell>
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
