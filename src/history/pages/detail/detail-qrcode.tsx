import { View, Text } from "@tarojs/components";
import CodeCreator from "taro-code-creator";
import { useRequest } from "ahooks";
import { activityRead, manageActivityGenerateCode } from "@/api";
import { useRouter } from "@tarojs/taro";
import { Cell, Dialog, Form, Stepper } from "@taroify/core";
import Button from "@taroify/core/button/button";
import { useState } from "react";

export default function () {
	const { params } = useRouter();

	const { id } = params;

	const { data: activity } = useRequest(activityRead, {
		defaultParams: [Number(id)],
		ready: !!id,
	});

	const [isSetting, setisSetting] = useState(false);

	const [settingSpacing, setsettingSpacing] = useState<number>(10);

	const { data, loading: findCodeLoading } = useRequest(
		() => manageActivityGenerateCode(Number(id), settingSpacing),
		{
			ready: !!id && !isSetting,
			pollingInterval: settingSpacing * 1000,
		},
	);

	const handleSetting = () => {
		setisSetting(!isSetting);
	};

	return (
		<View>
			<Cell>
				<Text className="font-bold text-xl">活动签到码</Text>
			</Cell>
			<Cell
				title={activity?.name}
				brief={activity?.id}
				className="flex flex-row"
			>
				<Button color="primary" onClick={handleSetting}>
					设置
				</Button>
			</Cell>
			<View className="flex">
				{!findCodeLoading && data && (
					<View
						className="mx-auto mt-4"
						style={{ display: isSetting ? "none" : "" }}
					>
						<CodeCreator codeText={data.code} size={512}></CodeCreator>
					</View>
				)}
			</View>

			<Dialog open={isSetting} onClose={setisSetting}>
				<Dialog.Header>签到码生效时长</Dialog.Header>
				<Dialog.Content>
					<Form
						onSubmit={(e) => {
							setsettingSpacing(e.detail.value!.spacingTime);
							setisSetting(false);
						}}
					>
						<Form.Item name="spacingTime" defaultValue={10}>
							<Form.Control>
								<Stepper
									defaultValue={10}
									min={1}
									max={4294967295}
									precision={0}
									className="m-auto"
								>
									<Stepper.Button />
									<Stepper.Input width={80} />
									<Stepper.Button />
								</Stepper>
							</Form.Control>
						</Form.Item>

						<Button shape="round" block color="primary" formType="submit">
							提交
						</Button>
					</Form>
				</Dialog.Content>
			</Dialog>
		</View>
	);
}
