import { UserProfile } from "@/api";
import { PLACEHOLDER } from "@/shared/constants";
import { Pattern } from "@/shared/pattern";
import { Cell, Field, Form, Input, Button } from "@taroify/core";
import { ContactOutlined, Edit, PhoneOutlined } from "@taroify/icons";
import { View } from "@tarojs/components";
import { FC, ReactNode } from "react";

type UserFormProps = {
	user: Partial<UserProfile>;
	onSubmit?: (user: Partial<UserProfile>) => void;
	submitContent?: string;
	renderAfterFields?: () => ReactNode;
};

const UserForm: FC<UserFormProps> = (props) => {
	const { user, onSubmit, submitContent = "提交", renderAfterFields } = props;

	const idFieldName = user.isAdmin ? "校园卡号" : "学号";

	return (
		<View>
			<Form
				controlAlign="right"
				onSubmit={async (e) => {
					onSubmit?.(e.detail.value as Partial<UserProfile>);
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
						defaultValue={user.name}
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
						defaultValue={user.username}
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
						defaultValue={user.phone}
					>
						<Input placeholder={PLACEHOLDER} />
					</Field>
					{renderAfterFields?.()}
				</Cell.Group>
				<View className="p-4">
					<Button block color="primary" formType="submit">
						{submitContent}
					</Button>
				</View>
			</Form>
		</View>
	);
};

export default UserForm;
