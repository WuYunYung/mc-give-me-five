import { ActivityRead } from "@/api";
import { DateFormat } from "@/shared/constants";
import { View, Text } from "@tarojs/components";
import dayjs from "dayjs";

export default function ActivityDetailCard({
	activityDetail,
}: { activityDetail: ActivityRead }) {
	return (
		<View>
			<View className="w-full h-40 flex bg-[url('https://www.szu.edu.cn/images/z-bg4.jpg')] bg-cover">
				<View className="m-auto text-white text-xl">{activityDetail.name}</View>
			</View>
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
						{dayjs(activityDetail.start_time).format(DateFormat.Display)}
					</Text>
				</View>
				<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-auto">结束时间</Text>
					<Text className="my-auto ml-auto text-slate-400">
						{dayjs(activityDetail.end_time).format(DateFormat.Display)}
					</Text>
				</View>

				<View className="mt-3 h-6 leading-4 text-slate-400 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					活动描述
				</View>
				<View className="flex w-full h-auto border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-2 text-slate-400">
						{activityDetail.description}
					</Text>
				</View>
			</View>
		</View>
	);
}
