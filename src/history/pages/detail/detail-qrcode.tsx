import { View, Text } from "@tarojs/components";
import CodeCreator from "taro-code-creator";
import { useRequest } from "ahooks";
import { manageActivityGenerateCode } from "@/api";
import { useRouter } from "@tarojs/taro";
import { Cell } from "@taroify/core";

export default function () {
	const { params } = useRouter();

	const { id } = params;

	const { data, loading: findCodeLoading } = useRequest(
		() => manageActivityGenerateCode(Number(id), 10),
		{
			ready: !!id,
			pollingInterval: 10000,
			pollingWhenHidden: false,
		},
	);
	return (
		<View>
			<Cell>
				<Text className="font-bold text-xl">活动签到码</Text>
			</Cell>
			<View className="flex">
				{!findCodeLoading && data && (
					<View className="mx-auto mt-4">
						<CodeCreator codeText={data.code} size={512}></CodeCreator>
					</View>
				)}
			</View>
		</View>
	);
}
