import { UserProfileUpdate, userProfileUpdate } from "@/api";
import { Pattern } from "@/shared/pattern";
import { routeBack } from "@/shared/route";
import useStore from "@/shared/store";
import { Button, Field, Form, Input } from "@taroify/core";
import { View } from "@tarojs/components";
import { useRequest } from "ahooks";
import { showModal } from "@tarojs/taro";

definePageConfig({
	navigationBarTitleText: "联系电话",
});

export default function () {
	const { user, loadUser } = useStore();

	const { phone } = user || {};

	const { run } = useRequest(userProfileUpdate, {
		manual: true,
		async onSuccess() {
			await loadUser();
			routeBack();
		},
	});

	return (
		<View>
			<Form
				onSubmit={async (e) => {
					const value = e.detail.value as UserProfileUpdate;
					const { confirm } = await showModal({
						content: `确认联系电话将更新为${value.phone}吗？`,
					});
					confirm && run(value);
				}}
			>
				<Field
					label="联系电话"
					name="phone"
					rules={[
						{
							required: true,
							pattern: Pattern.mobile,
							message: "请输入正确的联系电话",
						},
						{
							validator(value) {
								return value !== phone;
							},
							message: "请输入不同的联系电话",
						},
					]}
				>
					<Input type="number" placeholder="请输入联系电话" />
				</Field>
				<View className="p-4">
					<Button block color="primary" formType="submit">
						提交
					</Button>
				</View>
			</Form>
		</View>
	);
}
