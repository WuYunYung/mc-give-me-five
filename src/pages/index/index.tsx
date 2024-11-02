import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.css";
import { Button } from "@taroify/core";
import { useRequest } from "ahooks";
import { activityAttend } from "@/api";

export default function Index() {
	useLoad(() => {
		console.log("Page loaded.");
	});

	useRequest(() => activityAttend(1));

	return (
		<View className="index">
			<View className="flex flex-col p-4">
				<Text className="text-red-500">Hello world!</Text>
				<Button color="primary">Click here!</Button>
			</View>
		</View>
	);
}
