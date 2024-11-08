import { manageGroupList } from "@/api";
import { View } from "@tarojs/components";
import Feeds from "@/components/Feeds";
import { Cell } from "@taroify/core";
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
							{list.map((item) => (
								<Cell
									key={item.id}
									title={item.name}
									isLink
									brief={item.grade.name}
									align="center"
									onClick={() =>
										routePush("/manage/pages/users/list", {
											groupId: item.id,
											gradeId,
											groupName: item.name,
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
