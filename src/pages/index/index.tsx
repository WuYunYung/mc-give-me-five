import { activityCountByType } from "@/api";
import { routePush } from "@/shared/route";
import { Text, View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { useRequest } from "ahooks";
import { useState } from "react";

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
	const [countByType, setcountByType] = useState<number[]>([]);

	const handleNavigateTo = (type: Type) => {
		routePush("/activity/pages/activitylist", {
			type: type,
		});
	};

	const { run } = useRequest(activityCountByType, {
		onSuccess(res) {
			console.log(res);
			for (let i = 0; i < type.length; i++) {
				if (res[i] && Number(type[i]) === res[i].type) {
					setcountByType((prev) => [...prev, res[i].count]);
				} else {
					setcountByType((prev) => [...prev, 0]);
				}
			}
		},
	});

	useLoad(() => {
		run();
	});

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
						className="box-border w-full h-40 rounded-xl bg-center bg-cover bg-no-repeat"
						style={{
							backgroundImage: `url(${imageUrl[index]})`,
							filter: "grayscale(.8)",
						}}
					/>
					<View className="relative bottom-8">
						<Text className="absolute ml-4 font-bold text-lg text-white">
							{"类型" + item + "   " + countByType[index]}
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
