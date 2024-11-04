import { Button, SafeArea } from "@taroify/core";
import { FriendsOutlined, ManagerOutlined } from "@taroify/icons";
import { View } from "@tarojs/components";
import { cloneElement, ReactElement } from "react";

function Card(props: {
	icon: ReactElement;
	label: string;
	onClick: () => void;
}) {
	const { icon, label, onClick } = props;
	return (
		<View className="bg-white flex justify-center items-center p-4 gap-4 flex-col rounded-md">
			{cloneElement(icon, {
				size: 100,
				className: "my-4",
			})}
			<Button onClick={onClick} className="w-full" color="primary">
				{label}
			</Button>
		</View>
	);
}

export default function () {
	return (
		<View className="flex flex-col px-4 bg-primary h-screen">
			<View className="flex-1 flex flex-col justify-between py-4">
				<Card icon={<ManagerOutlined />} label="我是教师" />
				<Card icon={<FriendsOutlined />} label="我是学生" />
				<Button variant="text" className="text-white opacity-75">
					我是访客
				</Button>
			</View>
			<SafeArea position="bottom" />
		</View>
	);
}
