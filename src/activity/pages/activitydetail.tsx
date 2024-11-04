import { Button } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";

type activitydetail = {
	id: number;
	name: string;
	description: string;
	creator: string;
	startTime: string;
	endTime: string;
	location: string;
	capacity: number;
	type: number;
	attendCount: number;
};

const activity: activitydetail = {
	id: 0,
	name: "crazy thursday",
	description:
		"what can i say what can i say what can i say what can i say what can i say",
	creator: "teacher ma",
	attendCount: 62,
	capacity: 70,
	location: "shenzhen university",
	startTime: "",
	endTime: "",
	type: 0,
};

export default function () {
	// const { params } = useRouter();

	// const activityId = params.id;

	return (
		<View className="flex flex-col">
			<View className="w-full h-40 flex">
				<View className="m-auto">{activity.name}</View>
			</View>
			<View className="flex flex-col px-2">
				<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-auto">负责人</Text>
					<Text className="my-auto ml-auto text-slate-400">
						{activity.creator}
					</Text>
				</View>
				<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-auto">活动名额</Text>
					<Text className="my-auto ml-auto text-slate-400">
						{activity.attendCount} / {activity.capacity}
					</Text>
				</View>
				<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-auto">活动地点</Text>
					<Text className="my-auto ml-auto text-slate-400">
						{activity.location}
					</Text>
				</View>
				<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-auto">开始时间</Text>
					<Text className="my-auto ml-auto text-slate-400">
						{activity.startTime}
					</Text>
				</View>
				<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-auto">结束时间</Text>
					<Text className="my-auto ml-auto text-slate-400">
						{activity.endTime}
					</Text>
				</View>

				<View className="mt-3 h-6 leading-4 text-slate-400 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					活动描述
				</View>
				<View className="flex w-full h-auto border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
					<Text className="my-2 text-slate-400">{activity.description}</Text>
				</View>
			</View>

			<Button color="primary" className="w-4/5 mx-auto mt-4">
				报名
			</Button>
		</View>
	);
}
