import { sysTimeList } from "@/api";
import { routePush } from "@/shared/route";
import { Text, View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useRequest } from "ahooks";

definePageConfig({
	navigationBarTitleText: "首页",
	navigationBarBackgroundColor: "#930a41",
});

type Type = "0" | "1" | "2" | "3";

const type: Type[] = ["0", "1", "2", "3"];

const imageUrl = [
	"https://www.szu.edu.cn/images/my/240626campusview6.jpg",
	"https://www.szu.edu.cn/images/my/240626campusview4.jpg",
	"https://www.szu.edu.cn/images/my/kejidalou.jpg",
	"https://www.szu.edu.cn/images/my/240626campusview9.jpg",
];

export default function Index() {
	useLoad(() => {
		console.log("Page loaded.");
	});

	useRequest(() => sysTimeList());

	const handleNavigateTo = (type: Type) => {
		routePush("/activity/pages/activitylist", {
			type: type,
		});
	};

	const renderMap = (
		<View className="flex flex-col p-4 gap-4">
			{type.map((item: Type, index: number) => (
				<View
					key={index}
					className="w-full box-border h-40 bg-white rounded-xl flex flex-col p-1"
					onClick={() => {
						handleNavigateTo(item);
					}}
				>
					<View
						className="box-border w-full h-32 rounded-t-xl)] bg-center bg-cover bg-no-repeat"
						style={{
							backgroundImage: `url(${imageUrl[index]})`,
						}}
					/>
					<Text className="ml-4 font-bold">{item}</Text>
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
