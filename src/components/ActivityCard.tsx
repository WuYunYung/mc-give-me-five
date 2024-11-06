import { ActivityRead } from "@/api";
import { View, Text, Image } from "@tarojs/components";
import { routePush } from "@/shared/route";
import dayjs from "dayjs";

import banner1 from "../static/banner/banner1.svg";
import banner2 from "../static/banner/banner2.svg";
import banner3 from "../static/banner/banner3.svg";
import banner4 from "../static/banner/banner4.svg";

type CardMode = "activity" | "history";

// 定义类型映射
type BannerType = "0" | "1" | "2" | "3";

const bannerMap: Record<BannerType, string> = {
	"0": banner1,
	"1": banner2,
	"2": banner3,
	"3": banner4,
};

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
			<View className="flex w-full h-32 rounded-t-lg box-border border-solid border-gray-300">
				<Image className="w-32 h-32" src={bannerMap[activityDetail.type]} />
				<Text className="m-auto font-bold text-xl">{activityDetail.name}</Text>
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
