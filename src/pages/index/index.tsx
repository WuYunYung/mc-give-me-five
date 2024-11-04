import { sysTimeList } from "@/api";
import { routePush } from "@/shared/route";
import { Text, View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useRequest } from "ahooks";

definePageConfig({
	navigationBarTitleText: "首页",
	navigationBarBackgroundColor: "#930a41",
});

const type = ["type1", "type2", "type3", "type4"];

export default function Index() {
	useLoad(() => {
		console.log("Page loaded.");
	});

	useRequest(() => sysTimeList());

	const handleNavigateTo = (type: string) => {
		routePush("/activity/pages/activitylist", {
			type: type,
		});
	};

	const renderMap = (
		<View
			className="flex flex-col p-4 gap-4"
			style={{ background: "linear-gradient(#930a41, #ffffff)" }}
		>
			{type.map((item: string, index: number) => (
				<View
					key={index}
					className="w-full box-border h-40 bg-white rounded-xl flex flex-col"
					onClick={() => {
						handleNavigateTo(item);
					}}
				>
					<View className="bg-white w-full h-32 rounded-t-xl" />
					<Text className="ml-4 font-bold">{item}</Text>
				</View>
			))}
		</View>
	);

	return <View className="index">{renderMap}</View>;
}
