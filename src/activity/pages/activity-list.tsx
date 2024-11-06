import { activityList, ActivityRead } from "@/api";
import { View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import ActivityCard from "../../components/ActivityCard";
import Feeds from "@/components/Feeds";
import { ActivityStatus } from "@/shared/constants";
import dayjs from "dayjs";

type Type = "0" | "1" | "2" | "3";

export default function () {
	const { params: routeQuery } = useRouter<{
		type?: Type;
		status?: ActivityStatus;
		start_time?: string;
		end_time?: string;
	}>();

	return (
		<Feeds
			disabledSearch
			service={async (params) => {
				const innerParams = {} as Partial<
					Exclude<Parameters<typeof activityList>[0], undefined>
				>;

				const { type, status, end_time, start_time } = routeQuery;

				if (type) {
					innerParams.type = type;
				}
				if (status) {
					innerParams.status = status;
				}

				if (!Number.isNaN(Number(end_time))) {
					innerParams.end_time = dayjs(Number(end_time)).format(
						"YYYY-MM-DDThh:mm:ss",
					);
				}

				if (!Number.isNaN(Number(start_time))) {
					innerParams.end_time = dayjs(Number(start_time)).format(
						"YYYY-MM-DDThh:mm:ss",
					);
				}

				const { results = [] } = await activityList({
					...params,
					...innerParams,
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
