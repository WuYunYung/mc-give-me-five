import { ActivityRead } from "@/api";
import { DateFormat } from "@/shared/constants";
import { Cell } from "@taroify/core";
import { View } from "@tarojs/components";
import dayjs from "dayjs";

export default function ActivityDetailCard({
	activityDetail,
}: { activityDetail: ActivityRead }) {
	return (
		<View>
			<View className="w-full h-40 flex bg-[url('https://www.szu.edu.cn/images/z-bg4.jpg')] bg-cover">
				<View className="m-auto text-white text-xl">{activityDetail.name}</View>
			</View>
			<Cell.Group>
				<Cell title="负责人">{activityDetail.creator.name}</Cell>
				<Cell title="活动名额">
					{activityDetail.get_attenders_count} / {activityDetail.capacity}
				</Cell>
				<Cell title="活动地点">{activityDetail.location}</Cell>
				<Cell title="开始时间">
					{dayjs(activityDetail.start_time).format(DateFormat.Display)}
				</Cell>
				<Cell title="结束时间">
					{dayjs(activityDetail.end_time).format(DateFormat.Display)}
				</Cell>
				<Cell>{activityDetail.description}</Cell>
			</Cell.Group>
		</View>
	);
}
