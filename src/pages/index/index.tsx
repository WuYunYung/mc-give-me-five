import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.css";
import { useRequest } from "ahooks";
import { Api } from "@/api";

export default function Index() {
	useLoad(() => {
		console.log("Page loaded.");
	});

	useRequest(() => new Api().activity.activityAttend(1));

	return (
		<View className="index">
			<Text className="text-red-500">Hello world!</Text>
		</View>
	);
}
