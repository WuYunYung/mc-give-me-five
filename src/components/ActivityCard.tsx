import { ActivityRead } from "@/api";
import { View, Text } from "@tarojs/components";
import { routePush } from "@/shared/route";
import dayjs from "dayjs";

type CardMode = "activity" | "history";

export default function ActivityCard({
	activityDetail,
	mode,
}: { activityDetail: ActivityRead; mode: CardMode }) {
	return (
		<View
			className="box-border flex flex-col w-full shadow-xl rounded-lg mb-4"
			onClick={() => {
				routePush(`/${mode}/pages/${mode}detail`, {
					id: activityDetail.id,
				});
			}}
		>
			<View className="w-full h-32 bg-black rounded-t-lg"></View>
			<View className="flex flex-col px-2">
				<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-auto">负责人</Text>
					<Text className="my-auto ml-auto text-slate-400">
						{activityDetail.creator.name}
					</Text>
				</View>
				<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-auto">活动名额</Text>
					<Text className="my-auto ml-auto text-slate-400">
						{activityDetail.get_attenders_count} / {activityDetail.capacity}
					</Text>
				</View>
				<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-auto">活动地点</Text>
					<Text className="my-auto ml-auto text-slate-400">
						{activityDetail.location}
					</Text>
				</View>
				<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-auto">开始时间</Text>
					<Text className="my-auto ml-auto text-slate-400">
						{dayjs(activityDetail.start_time).format("YYYY-MM-DD HH:mm")}
					</Text>
				</View>
				<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-auto">结束时间</Text>
					<Text className="my-auto ml-auto text-slate-400">
						{dayjs(activityDetail.end_time).format("YYYY-MM-DD HH:mm")}
					</Text>
				</View>
			</View>
		</View>
	);
}
