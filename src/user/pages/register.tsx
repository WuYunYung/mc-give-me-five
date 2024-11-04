import { Button, Cell, Field, Form, Image, Input } from "@taroify/core";
import { ContactOutlined, Edit } from "@taroify/icons";
import { View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";

const LOGO_PATH = "https://cmc.szu.edu.cn/images/logo.png";

export default function () {
	const { params } = useRouter();

	const isTeacher = params.isTeacher === "1";

	const logo = (
		<View className="bg-primary px-4 flex justify-center items-center h-1/4 overflow-hidden">
			<Image src={LOGO_PATH} mode="aspectFit" className="w-full h-full" />
		</View>
	);

	const idFieldName = isTeacher ? "校园卡号" : "学号";

	// TODO: 选班级
	const form = (
		<View>
			<Form>
				<Cell.Group>
					<Field label="姓名" name="name" icon={<ContactOutlined />}>
						<Input placeholder="姓名" />
					</Field>
					<Field label={idFieldName} name="id" icon={<Edit />}>
						<Input placeholder={idFieldName} />
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
