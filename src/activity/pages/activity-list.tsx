import { activityList, ActivityRead } from "@/api";
import { View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import ActivityCard from "../../components/ActivityCard";
import Feeds from "@/components/Feeds";
import { ActivityStatus, DateFormat } from "@/shared/constants";
import dayjs from "dayjs";
import { useCreation } from "ahooks";
import useStore from "@/shared/store";

type Type = "0" | "1" | "2" | "3";

export default function () {
	const { params: routeQuery } = useRouter<{
		type?: Type;
		status?: ActivityStatus;
		start_time?: string;
		end_time?: string;
	}>();

	const { user } = useStore();

	const { isAdmin } = user || {};

	const startTime = useCreation(() => dayjs().format(DateFormat.Remote), []);

	return (
		<Feeds
			disabledSearch
			service={async (params) => {
				const innerParams = {} as Partial<
					Exclude<Parameters<typeof activityList>[0], undefined>
				>;

				const {
					type,
					status,
					end_time,
					start_time: queryStartTime,
				} = routeQuery;

				if (type) {
					innerParams.type = type;
				}
				if (status) {
					innerParams.status = status;
				}

				if (!Number.isNaN(Number(end_time))) {
					innerParams.end_time = dayjs(Number(end_time)).format(
						DateFormat.Remote,
					);
				}

				if (!Number.isNaN(Number(queryStartTime))) {
					innerParams.start_time = dayjs(Number(queryStartTime)).format(
						DateFormat.Remote,
					);
				} else if (!isAdmin) {
					innerParams.start_time = startTime;
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
							<ActivityCard activityDetail={item} key={item.id}></ActivityCard>
						))}
					</View>
				);
			}}
		/>
	);
}
