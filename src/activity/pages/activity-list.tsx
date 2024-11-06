import { activityList, ActivityRead } from "@/api";
import { View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import ActivityCard from "../../components/ActivityCard";
import Feeds from "@/components/Feeds";

type Type = "0" | "1" | "2" | "3";

export default function () {
	const { params } = useRouter<{
		type?: Type;
	}>();
	const { type } = params;

	return (
		<Feeds
			disabledSearch
			service={async (params) => {
				const { results = [] } = await activityList({
					...params,
					type,
				});
				return results;
			}}
			renderContent={(list) => {
				return (
					<View className="px-4 pt-4">
						{list.map((item: ActivityRead) => (
							<ActivityCard
								activityDetail={item}
								mode="activity"
								key={item.id}
							></ActivityCard>
						))}
					</View>
				);
			}}
		/>
	);
}
