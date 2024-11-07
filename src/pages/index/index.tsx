import { routePush } from "@/shared/route";
import { Text, View } from "@tarojs/components";
import banner1 from "../../static/banner/banner1.svg";
import banner2 from "../../static/banner/banner2.svg";
import banner3 from "../../static/banner/banner3.svg";
import banner4 from "../../static/banner/banner4.svg";
import { Image } from "@taroify/core";
import useActivityCountByType from "@/hooks/useActivityCountByType";

definePageConfig({
	navigationBarTitleText: "首页",
});

type Type = "0" | "1" | "2" | "3";

const imageUrl = [banner1, banner2, banner3, banner4];

export default function Index() {
	const handleNavigateTo = (type: Type) => {
		routePush("/activity/pages/activity-list", {
			type: type,
		});
	};

	const { data } = useActivityCountByType();

	const renderMap = (
		<View className="flex flex-col p-4 gap-4">
			{data.map((item) => (
				<View
					key={item.type}
					className="w-full box-border h-40 bg-white flex flex-col border-solid border-gray-300 rounded-lg"
					onClick={() => {
						handleNavigateTo(item.type as Type);
					}}
				>
					<View className="relative w-full">
						<View className="absolute flex top-4 right-4 w-6 h-6 bg-primary-900">
							<Text className="m-auto text-white font-bold">{item.total}</Text>
						</View>
					</View>
					<Image className="box-border w-full h-40" src={imageUrl[item.type]} />
					<View className="relative bottom-8">
						<Text className="absolute ml-4 font-bold text-lg text-black">
							{`类型${item.type}`}
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
