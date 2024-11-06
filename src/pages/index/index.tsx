import { activityCountByType } from "@/api";
import { routePush } from "@/shared/route";
import { Text, View } from "@tarojs/components";
import { useRequest } from "ahooks";
import { keyBy } from "lodash-es";
import { useMemo } from "react";
import banner1 from "../../static/banner/banner1.svg";
import banner2 from "../../static/banner/banner2.svg";
import banner3 from "../../static/banner/banner3.svg";
import banner4 from "../../static/banner/banner4.svg";
import { Image } from "@taroify/core";

definePageConfig({
	navigationBarTitleText: "首页",
	navigationBarBackgroundColor: "#930a41",
});

type Type = "0" | "1" | "2" | "3";

const types = ["0", "1", "2", "3"] as const;

const imageUrl = [banner1, banner2, banner3, banner4];

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
					className="w-full box-border h-40 bg-white flex flex-col border-solid border-gray-300 shadow-white"
					style={{
						boxShadow: "4px 4px 2px 1px rgba(255, 255, 255, 1)",
					}}
					onClick={() => {
						handleNavigateTo(type);
					}}
				>
					<View className="relative w-full">
						<View className="absolute flex top-4 right-4 w-6 h-6 bg-[#930a41]">
							<Text className="m-auto text-white font-bold">
								{activityCountMap[type]?.count || 0}
							</Text>
						</View>
					</View>
					<Image className="box-border w-full h-40" src={imageUrl[type]} />
					<View className="relative bottom-8">
						<Text className="absolute ml-4 font-bold text-lg text-black">
							{`类型${type}`}
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
