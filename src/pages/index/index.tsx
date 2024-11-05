import { activityCountByType } from "@/api";
import { routePush } from "@/shared/route";
import { Text, View } from "@tarojs/components";
import { useRequest } from "ahooks";
import { keyBy } from "lodash-es";
import { useMemo } from "react";

definePageConfig({
	navigationBarTitleText: "首页",
	navigationBarBackgroundColor: "#930a41",
});

type Type = "0" | "1" | "2" | "3";

const types = ["0", "1", "2", "3"] as const;

const imageUrl = [
	"https://www.szu.edu.cn/images/my/240626campusview6.jpg",
	"https://www.szu.edu.cn/images/my/240626campusview4.jpg",
	"https://www.szu.edu.cn/images/my/kejidalou.jpg",
	"https://www.szu.edu.cn/images/my/240626campusview9.jpg",
];

export default function Index() {
	const handleNavigateTo = (type: Type) => {
		routePush("/activity/pages/activitylist", {
			type: type,
		});
	};

	const { data } = useRequest(activityCountByType);

	const activityCountMap = useMemo(
		() => keyBy((data || []) as { type: Type; count: number }[], "type"), // TODO 接口文档与实际返回类型对不上
		[data],
	);

	const renderMap = (
		<View className="flex flex-col p-4 gap-4">
			{types.map((type: Type) => (
				<View
					key={type}
					className="w-full box-border h-40 bg-white rounded-xl flex flex-col p-1"
					onClick={() => {
						handleNavigateTo(type);
					}}
				>
					<View
						className="box-border w-full h-40 rounded-xl bg-center bg-cover bg-no-repeat"
						style={{
							backgroundImage: `url(${imageUrl[type]})`,
							filter: "grayscale(.8)",
						}}
					/>
					<View className="relative bottom-8">
						<Text className="absolute ml-4 font-bold text-lg text-white">
							{`类型${type}   ${activityCountMap[type]?.count || 0}`}
						</Text>
					</View>
				</View>
			))}
		</View>
	);

	return (
		<View
			className="w-full h-screen overflow-scroll"
			style={{ background: "linear-gradient(#930a41, #ffffff)" }}
		>
			{renderMap}
		</View>
	);
}
