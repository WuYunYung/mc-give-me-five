import {
	Grade,
	GroupUpdate,
	manageGradeList,
	manageGroupCreate,
	manageGroupPartialUpdate2,
	manageGroupRead,
} from "@/api";
import Feeds from "@/components/Feeds";
import withPopup from "@/components/withPopup";
import { routeBack, routePush, routeRedirect } from "@/shared/route";
import { Cell, Field, Form, Input, Popup } from "@taroify/core";
import Button from "@taroify/core/button/button";
import { View } from "@tarojs/components";
import { getWindowInfo, useRouter, setNavigationBarTitle } from "@tarojs/taro";
import { useRequest } from "ahooks";
import { concat, isNil } from "lodash-es";
import { useLayoutEffect } from "react";

definePageConfig({
	navigationBarTitleText: "",
});

const PopupList = withPopup({
	renderContent(params) {
		const { onChange, onBlur, toggleOpen } = params;

		const { windowHeight } = getWindowInfo();

		const panelHeight = windowHeight * 0.7;

		return (
			<>
				<View className="h-10">
					<Popup.Close />
				</View>
				<Feeds
					height={panelHeight}
					disabledSearch
					service={async (params) => {
						const { results = [] } = await manageGradeList(params);
						return concat(results);
					}}
					renderContent={(list) => (
						<Cell.Group>
							{list.map((grade) => (
								<Cell
									key={grade.id}
									title={<View className="text-left">{grade.name}</View>}
									clickable
									onClick={(e) => {
										e.stopPropagation();
										onChange?.(grade);
										onBlur?.(grade);
										toggleOpen(false);
									}}
								>
									{grade.groups?.length || 0}
								</Cell>
							))}
						</Cell.Group>
					)}
				></Feeds>
			</>
		);
	},
});

export default function () {
	const { params } = useRouter<{
		groupId?: string;
	}>();

	const { groupId: queryId } = params;

	const isCreatiion = isNil(queryId);

	const id = Number(queryId);

	const { data: detail } = useRequest(() => manageGroupRead(id), {
		ready: !isCreatiion && !Number.isNaN(id),
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
		(grade: Omit<GroupUpdate, "id">) =>
			isCreatiion
				? manageGroupCreate(grade)
				: manageGroupPartialUpdate2(id, grade),
		{
			ready: isCreatiion || !Number.isNaN(id),
			manual: true,
			onSuccess({ id: groupId, name: groupName }) {
				if (isCreatiion && groupId) {
					return routeRedirect("/manage/pages/group/import-users", {
						groupId,
						groupName,
					});
				}
				routeBack();
			},
		},
	);

	const form = (
		<Form
			onSubmit={(e) => {
				const { name, grade } = e.detail.value as {
					name: string;
					grade: Grade;
				};

				run({
					name,
					grade: grade.id!,
				});
			}}
			controlAlign="right"
		>
			<Cell.Group>
				<Field
					label="年级"
					name="grade"
					defaultValue={detail?.grade}
					rules={[
						{
							required: true,
							message: "请选择年级",
						},
					]}
				>
					{({ value, onChange, onBlur }) => {
						return (
							<PopupList value={value} onChange={onChange} onBlur={onBlur}>
								<Input placeholder="请输入" readonly value={value?.name} />
							</PopupList>
						);
					}}
				</Field>
				<Field
					label="班级名"
					name="name"
					rules={[
						{
							required: true,
							pattern: /.{1,50}/,
							message: "请输入正确的班级名",
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

	const importButton = (
		<View className="px-4">
			<Button
				block
				variant="text"
				onClick={() => {
					routePush("/manage/pages/group/import-users", {
						groupId: id,
						groupName: detail?.name,
					});
				}}
			>
				导入
			</Button>
		</View>
	);

	return (
		<View>
			{isCreatiion ? form : detail ? form : null}

			{!isCreatiion && importButton}
		</View>
	);
}
