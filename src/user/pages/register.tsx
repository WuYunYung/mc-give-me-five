import { UserRegister, userRegister } from "@/api";
import { PLACEHOLDER } from "@/shared/constants";
import { Pattern } from "@/shared/pattern";
import useStore from "@/shared/store";
import { Button, Cell, Field, Form, Image, Input } from "@taroify/core";
import { ContactOutlined, Edit, PhoneOutlined } from "@taroify/icons";
import { View } from "@tarojs/components";
import {
	useRouter,
	showModal,
	showLoading,
	hideLoading,
	reLaunch,
} from "@tarojs/taro";
import { useRequest } from "ahooks";

const LOGO_PATH = "https://cmc.szu.edu.cn/images/logo.png";

export default function () {
	const { params } = useRouter();
	const { toggleVisitor, loadUser } = useStore();

	const isTeacher = params.isTeacher === "1";

	const logo = (
		<View className="bg-primary-900 px-4 flex justify-center items-center h-1s5 overflow-hidden w-full">
			<Image src={LOGO_PATH} mode="aspectFit" className="w-1s2 h-full" />
		</View>
	);

	const idFieldName = isTeacher ? "校园卡号" : "学号";

	const { run } = useRequest(userRegister, {
		manual: true,
		async onSuccess() {
			toggleVisitor(false);
			await loadUser();
			reLaunch({
				url: "/pages/index/index",
			});
		},
		onBefore() {
			showLoading();
		},
		onFinally() {
			hideLoading();
		},
	});

	const form = (
		<View>
			<Form
				onSubmit={async (e) => {
					const { confirm } = await showModal({
						title: "确认",
						content: "提交后不可修改，请务必确认个人信息无误",
					});

					confirm && run(e.detail.value as UserRegister);
				}}
			>
				<Cell.Group>
					<Field
						label="姓名"
						name="name"
						icon={<ContactOutlined />}
						rules={[
							{
								pattern: Pattern.name,
								message: "请输入正确的姓名",
							},
						]}
					>
						<Input placeholder={PLACEHOLDER} />
					</Field>
					<Field
						label={idFieldName}
						name="username"
						icon={<Edit />}
						rules={[
							{
								pattern: Pattern.userName,
								message: `请输入正确的${idFieldName}`,
							},
						]}
					>
						<Input placeholder={PLACEHOLDER} />
					</Field>
					<Field
						label={"电话"}
						name="phone"
						icon={<PhoneOutlined />}
						rules={[
							{
								pattern: Pattern.mobile,
								message: "请输入正确的电话",
							},
						]}
					>
						<Input placeholder={PLACEHOLDER} />
					</Field>
				</Cell.Group>
				<View className="p-4">
					<Button block color="primary" formType="submit">
						注册
					</Button>
				</View>
			</Form>
		</View>
	);

	return (
		<View className="h-screen flex flex-col">
			{logo}
			{form}
		</View>
	);
}
