import { manageAttenderRead } from "@/api";
import { Cell } from "@taroify/core";
import { Text, View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useRequest } from "ahooks";

const attenderList = [
	{
		id: 1,
		name: "hrh",
		username: "2019152011",
		is_signed: 1,
	},
	{
		id: 2,
		name: "hrq",
		username: "2019152035",
		is_signed: 1,
	},
	{
		id: 3,
		name: "hrw",
		username: "2019152063",
		is_signed: 0,
	},
	{
		id: 4,
		name: "hre",
		username: "2019152092",
		is_signed: 1,
	},
];

export default function () {
	const { params } = useRouter();

	const { id } = params;

	useRequest(manageAttenderRead, {
		defaultParams: [Number(id)],
		onSuccess(res) {
			console.log(res);
		},
	});

	return (
		<View>
			<Cell>
				<Text className="font-bold text-xl">活动用户</Text>
			</Cell>
			<Cell.Group bordered={false}>
				<Cell title="学生信息">状态</Cell>
				{attenderList.map((item: any) => (
					<Cell key={item.id} title={item.name} brief={item.username}>
						{item.is_signed ? "已签到" : "未签到"}
					</Cell>
				))}
			</Cell.Group>
		</View>
	);
}
