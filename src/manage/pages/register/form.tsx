import {
	Group,
	manageRegisterCreate,
	manageRegisterPartialUpdate,
	manageRegisterRead,
	RegisterUpdate,
} from "@/api";
import { routeBack } from "@/shared/route";
import { Cell, Field, Form, Input } from "@taroify/core";
import Button from "@taroify/core/button/button";
import { View } from "@tarojs/components";
import { useRouter, setNavigationBarTitle } from "@tarojs/taro";
import { useRequest } from "ahooks";
import { isNil } from "lodash-es";
import { useLayoutEffect } from "react";
import GroupList from "@/components/GroupList";
import { PLACEHOLDER } from "@/shared/constants";
import { Pattern } from "@/shared/pattern";

definePageConfig({
	navigationBarTitleText: "",
});

export default function () {
	const { params } = useRouter<{
		registerId?: string;
		groupId?: string;
		groupName?: string;
	}>();

	const { registerId: queryId, groupId, groupName } = params;

	const queryGroup: Group | null =
		groupId && groupName
			? { id: +groupId, name: decodeURIComponent(groupName) }
			: null;

	const isCreation = isNil(queryId);

	const id = Number(queryId);

	const { data: detail } = useRequest(() => manageRegisterRead(id), {
		ready: !isCreation && !Number.isNaN(id),
		onSuccess({ name }) {
			setNavigationBarTitle({ title: name });
		},
	});

	useLayoutEffect(() => {
		if (isCreation) {
			setNavigationBarTitle({ title: "新建注册信息" });
		}
	});

	const { run } = useRequest(
		(register: Omit<RegisterUpdate, "id">) =>
			isCreation
				? manageRegisterCreate(register)
				: manageRegisterPartialUpdate(id, register),
		{
			ready: isCreation || !Number.isNaN(id),
			manual: true,
			onSuccess() {
				routeBack({
					shouldRefresh: true,
				});
			},
		},
	);

	const form = (
		<Form
			onSubmit={(e) => {
				const { name, group, username } = e.detail.value as {
					name: string;
					username: string;
					group: Group;
				};

				run({
					name,
					username,
					group: group.id!,
				});
			}}
			controlAlign="right"
		>
			<Cell.Group>
				<Field
					label={"学号"}
					name="username"
					rules={[
						{
							pattern: Pattern.userName,
							message: "请输入正确的学号",
						},
					]}
					defaultValue={detail?.username}
				>
					<Input placeholder={PLACEHOLDER} type="number" />
				</Field>
				<Field
					label="姓名"
					name="name"
					rules={[
						{
							required: true,
							pattern: /.{1,50}/,
							message: "请输入正确的姓名",
						},
					]}
					defaultValue={detail?.name}
				>
					<Input placeholder="请输入" />
				</Field>
			</Cell.Group>
			<Field
				label="班级"
				name="group"
				defaultValue={detail?.group || queryGroup}
				rules={[
					{
						required: true,
						message: "请选择班级",
					},
				]}
			>
				{({ value, onChange, onBlur }) => {
					return (
						<GroupList
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							disabled={!!queryGroup}
						>
							<Input placeholder="请选择" readonly value={value?.name} />
						</GroupList>
					);
				}}
			</Field>
			<View className="p-4">
				<Button block formType="submit" color="primary">
					提交
				</Button>
			</View>
		</Form>
	);

	return <View>{isCreation ? form : detail ? form : null}</View>;
}
