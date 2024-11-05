import {
	Grade,
	manageGradeCreate,
	manageGradePartialUpdate2,
	manageGradeRead,
} from "@/api";
import { routeBack } from "@/shared/route";
import { Cell, Field, Form, Input } from "@taroify/core";
import Button from "@taroify/core/button/button";
import { View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useRequest } from "ahooks";
import { isNil } from "lodash-es";

export default function () {
	const { params } = useRouter<{
		id?: string;
	}>();

	const { id: queryId } = params;

	const isCreatiion = isNil(queryId);

	const id = Number(queryId);

	const { data: detail } = useRequest(() => manageGradeRead(id), {
		ready: !Number.isNaN(id),
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

	return <View>{isCreatiion ? form : detail ? form : null}</View>;
}
