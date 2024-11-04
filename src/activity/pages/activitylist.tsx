import { Image, View, Text } from "@tarojs/components";
import defaultPage from "../../static/default/default.svg";
import { routePush } from "@/shared/route";

definePageConfig({
	navigationBarTitleText: "give me five",
	navigationBarBackgroundColor: "#930a41",
});

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

const list: activitydetail[] = [
	{
		id: 0,
		name: "crazy thursday",
		description: "what can i say",
		creator: "teacher ma",
		attendCount: 62,
		capacity: 70,
		location: "shenzhen university",
		startTime: "",
		endTime: "",
		type: 0,
	},
];

export default function () {
	return (
		<View>
			<View className="flex flex-col p-4">
				{!list.length && (
					<Image className="w-32 h-32 m-auto" src={defaultPage} />
				)}

				{list.length &&
					list.map((item: activitydetail, index: number) => (
						<View
							key={index}
							className="box-border flex flex-col w-full shadow-xl rounded-lg"
							onClick={() => {
								routePush("/activity/pages/activitydetail", {
									id: item.id,
								});
							}}
						>
							<View className="w-full h-32 bg-black rounded-t-lg"></View>
							<View className="flex flex-col px-2">
								<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
									<Text className="my-auto">负责人</Text>
									<Text className="my-auto ml-auto text-slate-400">
										{item.creator}
									</Text>
								</View>
								<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
									<Text className="my-auto">活动名额</Text>
									<Text className="my-auto ml-auto text-slate-400">
										{item.attendCount} / {item.capacity}
									</Text>
								</View>
								<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
									<Text className="my-auto">活动地点</Text>
									<Text className="my-auto ml-auto text-slate-400">
										{item.location}
									</Text>
								</View>
								<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
									<Text className="my-auto">开始时间</Text>
									<Text className="my-auto ml-auto text-slate-400">
										{item.startTime}
									</Text>
								</View>
								<View className="flex w-full h-12 border-b-2 border-x-0 border-t-0 border-solid  border-slate-100">
									<Text className="my-auto">结束时间</Text>
									<Text className="my-auto ml-auto text-slate-400">
										{item.endTime}
									</Text>
								</View>
							</View>
						</View>
					))}
			</View>

			<View className="w-full text-center text-slate-400 mt-8">
				{list.length && "- 没有更多内容了 -"}
				{!list.length && "- 暂无新活动 -"}
			</View>
		</View>
	);
}
