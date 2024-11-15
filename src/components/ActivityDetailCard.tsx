import { ActivityRead } from "@/api";
import { DateFormat } from "@/shared/constants";
import { Cell, Skeleton, WhiteSpace } from "@taroify/core";
import { View } from "@tarojs/components";
import dayjs from "dayjs";

export default function ActivityDetailCard({
	activityDetail,
}: { activityDetail?: ActivityRead }) {
	const contentSkeleton = <Skeleton className="w-24 ml-auto" />;

	const textareaSkeleton = (
		<View>
			<Skeleton className="w-full" />
			<WhiteSpace />
			<Skeleton className="w-full" />
			<WhiteSpace />
			<Skeleton className="w-1s3" />
		</View>
	);

	return (
		<View>
			<View className="w-full h-40 flex bg-[url('https://www.szu.edu.cn/images/z-bg4.jpg')] bg-cover">
				<View className="m-auto text-white text-xl">
					{activityDetail ? (
						activityDetail.name
					) : (
						<Skeleton className="w-32 h-6" />
					)}
				</View>
			</View>
			<Cell.Group>
				<Cell title="负责人">
					{activityDetail ? activityDetail.creator.name : contentSkeleton}
				</Cell>
				<Cell title="活动名额">
					{activityDetail
						? `${activityDetail.get_attenders_count} / ${activityDetail.capacity}`
						: contentSkeleton}
				</Cell>
				<Cell title="活动地点">
					{activityDetail ? activityDetail.location : contentSkeleton}
				</Cell>
				<Cell title="开始时间">
					{activityDetail
						? dayjs(activityDetail.start_time).format(DateFormat.Display)
						: contentSkeleton}
				</Cell>
				<Cell title="结束时间">
					{activityDetail
						? dayjs(activityDetail.end_time).format(DateFormat.Display)
						: contentSkeleton}
				</Cell>
				<Cell>
					{activityDetail ? activityDetail.description : textareaSkeleton}
				</Cell>
			</Cell.Group>
		</View>
	);
}
