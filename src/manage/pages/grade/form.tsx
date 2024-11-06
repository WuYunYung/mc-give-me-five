import {
	Grade,
	manageGradeCreate,
	manageGradeDelete2,
	manageGradePartialUpdate2,
	manageGradeRead,
} from "@/api";
import { routeBack } from "@/shared/route";
import { Cell, Field, Form, Input } from "@taroify/core";
import Button from "@taroify/core/button/button";
import { View } from "@tarojs/components";
import { useRouter, showModal, setNavigationBarTitle } from "@tarojs/taro";
import { useRequest } from "ahooks";
import { isNil } from "lodash-es";
import { useLayoutEffect } from "react";

// TODO: 封装详情页交互
export default function () {
	const { params } = useRouter<{
		id?: string;
	}>();

	const { id: queryId } = params;

	const isCreatiion = isNil(queryId);

	const id = Number(queryId);

	const { data: detail } = useRequest(() => manageGradeRead(id), {
		ready: !Number.isNaN(id),
		onSuccess({ name }) {
			setNavigationBarTitle({ title: name });
		},
	});

	useLayoutEffect(() => {
		if (isCreatiion) {
			setNavigationBarTitle({ title: "新建班级" });
		}
	});

	const { run } = useRequest(
		(grade: Omit<Grade, "id">) =>
			isCreatiion
				? manageGradeCreate(grade)
				: manageGradePartialUpdate2(id, grade),
		{
			ready: isCreatiion || !Number.isNaN(id),
			manual: true,
			onSuccess() {
				routeBack();
			},
		},
	);

	const form = (
		<Form onSubmit={(e) => run(e.detail.value as Grade)} controlAlign="right">
			<Cell.Group>
				<Field
					label="年级名"
					name="name"
					rules={[
						{
							required: true,
							pattern: /.{1,50}/,
							message: "请输入正确的年级名",
						},
					]}
					defaultValue={detail?.name}
				>
					<Input placeholder="请输入" />
				</Field>
			</Cell.Group>
			<View className="p-4">
				<Button block formType="submit" color="primary">
					提交
				</Button>
			</View>
		</Form>
	);

	const { run: deleteGrade } = useRequest(() => manageGradeDelete2(id), {
		manual: true,
		ready: !isCreatiion,
		onSuccess() {
			routeBack();
		},
	});

	const deleteButton = (
		<View className="px-4">
			<Button
				color="danger"
				block
				variant="text"
				onClick={async () => {
					await showModal({ content: `确定删除 ${detail?.name} 吗？` });
					deleteGrade();
				}}
			>
				删除年级
			</Button>
		</View>
	);

	return (
		<View>
			{isCreatiion ? form : detail ? form : null}

			{!isCreatiion && deleteButton}
		</View>
	);
}
