import { ActivityRead } from "@/api";
import { View, Text, Image } from "@tarojs/components";
import { routePush } from "@/shared/route";
import dayjs from "dayjs";

import banner1 from "../static/banner/banner1.svg";
import banner2 from "../static/banner/banner2.svg";
import banner3 from "../static/banner/banner3.svg";
import banner4 from "../static/banner/banner4.svg";
import { Cell } from "@taroify/core";
import { DateFormat } from "@/shared/constants";

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
}: { activityDetail: ActivityRead }) {
	return (
		<View
			className="box-border flex flex-col w-full shadow-xl rounded-lg mb-4 overflow-hidden"
			onClick={() => {
				routePush(`/history/pages/history-detail`, {
					id: activityDetail.id,
				});
			}}
		>
			<View className="flex w-full h-32 box-border border-solid border-gray-300 rounded-t-lg">
				<Image className="w-32 h-32" src={bannerMap[activityDetail.type]} />
				<Text className="m-auto font-bold text-xl">{activityDetail.name}</Text>
			</View>
			<Cell.Group bordered={false}>
				<Cell title="负责人">{activityDetail.creator.name}</Cell>
				<Cell title="活动名额">{`${activityDetail.get_attenders_count} / ${activityDetail.capacity}`}</Cell>
				<Cell title="活动地点">{activityDetail.location}</Cell>
				<Cell title="开始时间">
					{dayjs(activityDetail.start_time).format(DateFormat.Display)}
				</Cell>
				<Cell title="结束时间">
					{dayjs(activityDetail.end_time).format(DateFormat.Display)}
				</Cell>
			</Cell.Group>
		</View>
	);
}
