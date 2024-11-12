import { View } from "@tarojs/components";
import { activityList } from "@/api";
import ActivityCard from "../../components/ActivityCard";
import Feeds from "@/components/Feeds";
import useStore from "@/shared/store";
import { ActivityStatus } from "@/shared/constants";

definePageConfig({
	navigationBarTitleText: "历史",
	disableScroll: true,
});

export default function History() {
	const { user } = useStore();

	const { isAdmin } = user || {};

	return (
		<Feeds
			disableSaveArea
			service={async (params) => {
				const { results = [] } = await activityList({
					...params,
					status: isAdmin ? undefined : ActivityStatus.attend,
				});

				return results;
			}}
			renderContent={(list) => {
				return (
					<View className="px-4">
						{list.map((item) => (
							<ActivityCard activityDetail={item} key={item.id}></ActivityCard>
						))}
					</View>
				);
			}}
		/>
	);
}
