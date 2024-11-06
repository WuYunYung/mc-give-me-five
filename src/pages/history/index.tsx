import { View } from "@tarojs/components";
import { activityList, ActivityReadDetail } from "@/api";
import ActivityCard from "../../components/ActivityCard";
import Feeds from "@/components/Feeds";

definePageConfig({
	navigationBarTitleText: "历史",
});

export default function History() {
	return (
		<Feeds
			disableSaveArea
			service={async (params) => {
				const { results = [] } = await activityList(params);

				return results;
			}}
			renderContent={(list) => {
				return (
					<View className="px-4">
						{list.map((item: ActivityReadDetail) => (
							<ActivityCard
								activityDetail={item}
								mode="history"
								key={item.id}
							></ActivityCard>
						))}
					</View>
				);
			}}
		/>
	);
}
