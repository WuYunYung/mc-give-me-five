import { activityCountByType } from "@/api";
import { Loading, Progress, SafeArea } from "@taroify/core";
import { View } from "@tarojs/components";
import { useRequest } from "ahooks";
import { FC, useMemo } from "react";

definePageConfig({
	navigationBarTitleText: "历史统计",
});

type Summary = Record<number, number>;

type SummaryResult = {
	attend: Summary;
	signed: Summary;
	total: Summary;
};

type MapType<T, P> = {
	[K in keyof T]: P;
};

type CardProps = {
	type: string;
} & MapType<SummaryResult, number>;

const Card: FC<CardProps> = (props) => {
	const { type, attend = 0, signed = 0, total = 0 } = props;

	const percent = signed === 0 ? 0 : Math.ceil((signed / total) * 100);

	const renderDetail = (label: string, count: number) => {
		return (
			<View className="flex flex-col flex-1 gap-1 justify-center items-center">
				<View className="text-gray-500 text-sm">{label}</View>
				<View className="text-primary-900">{count}</View>
			</View>
		);
	};

	return (
		<View className="w-full rounded-lg shadow-lg flex flex-col overflow-hidden">
			<View className="bg-primary-900 h-24 w-full"></View>
			<View className="relative">
				<View
					className="absolute left-1s2 -top-1s2 w-24 h-24 bg-white rounded-full flex justify-center items-center"
					style={{
						transform: "translate(-50%, -50%)",
					}}
				>
					{`类型 ${type}`}
				</View>
			</View>
			<View className="h-48 relative">
				<View className="absolute py-8 px-4 w-full box-border flex flex-col gap-4 items-center h-full">
					<View className="text-sm text-gray-500">{`已参加 ${signed}/${total}`}</View>
					<Progress percent={percent} className="w-full" />
					<View className="flex justify-between flex-1 w-full">
						{renderDetail("已报名", attend)}
						<View className="w-[0.5px] h-full bg-gray-300 rounded-sm" />
						{renderDetail("已参加", signed)}
					</View>
				</View>
			</View>
		</View>
	);
};

export default function () {
	const { data, loading } = useRequest(() => activityCountByType());

	const { attend, signed, total } = (data as unknown as SummaryResult) || {};

	const types = useMemo(
		() => (total ? Object.keys(total).sort() : []),
		[total],
	);

	return (
		<View className="flex flex-col gap-4 p-4">
			{loading && <Loading />}
			{types.map((type) => {
				return (
					<Card
						key={type}
						type={type}
						attend={attend[type]}
						signed={signed[type]}
						total={total[type]}
					/>
				);
			})}
			<SafeArea position="bottom" />
		</View>
	);
}
