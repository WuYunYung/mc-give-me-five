import { Group, manageRegisterBatchRegister } from "@/api";
import { Pattern } from "@/shared/pattern";
import { routeRedirect } from "@/shared/route";
import { Button, Cell, Field, Form, Input } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import {
	useRouter,
	chooseMessageFile,
	showModal,
	setNavigationBarTitle,
} from "@tarojs/taro";
import { useMemoizedFn, useMount, useRequest } from "ahooks";
import { isString } from "lodash-es";
import { useMemo } from "react";
import GroupList from "@/components/GroupList";
import classNames from "classnames";
import { getTableMatrixByFile, readFile } from "../utils";

definePageConfig({
	navigationBarTitleText: "名单导入",
});

export default function () {
	const { params } = useRouter<{
		groupId?: string;
		groupName?: string;
	}>();

	const { groupId, groupName } = params;

	const innerGroupName = useMemo(
		() => (groupName ? decodeURIComponent(groupName) : undefined),
		[groupName],
	);

	useMount(() => {
		innerGroupName &&
			setNavigationBarTitle({ title: decodeURIComponent(innerGroupName) });
	});

	const guide = (
		<Cell.Group bordered={false}>
			<Cell title="名单导入:" brief="请选择一个excel文件" />
			<View className="px-4">
				<Text className="text-sm text-gray-500">
					注意事项:文件大小限制为2MB，记录条数限制为300条，文件格式要求第一列为用户学号，第二列为用户姓名，其中学号必须是在6到10位的纯数字，其他非法学号将被忽略，学号如果不重复将进行新增,重复将进行更新。
				</Text>
			</View>
		</Cell.Group>
	);

	const { run } = useRequest(
		(body: {
			username: string[];
			name: string[];
			group: number[];
		}) =>
			manageRegisterBatchRegister({
				body,
			} as any),
		{
			manual: true,
			onSuccess() {
				routeRedirect("/manage/pages/users/list", {
					groupId,
				});
			},
		},
	);

	const handleImport = useMemoizedFn(async (groupId: number) => {
		const { tempFiles } = await chooseMessageFile({
			count: 1,
			type: "file",
			extension: ["xls", "xlsx"],
		});

		const fileData = await readFile(tempFiles.at(0)?.path!);

		// 获取工作表的所有行，转换为矩阵
		const matrix = await getTableMatrixByFile(fileData.data as ArrayBuffer);

		const validMatirx = matrix.filter((row) => {
			const [userName, name] = row;

			if (
				Number.isNaN(Number(userName)) ||
				!Pattern.userName.test(userName?.toString() || "")
			) {
				return false;
			}

			if (!isString(name) || !Pattern.name.test(name)) {
				return false;
			}

			return true;
		});

		if (!validMatirx.length) return;

		if (validMatirx.length > 300) {
			showModal({
				content: "记录条数限制为300条",
			});
			return;
		}

		return run(
			validMatirx.reduce(
				(store, row) => {
					const [userName, name] = row;

					store.username.push(userName?.toString() || "");
					store.name.push(name as string);
					store.group.push(Number(groupId));

					return store;
				},
				{
					username: [],
					name: [],
					group: [],
				} as Parameters<typeof run>[0],
			),
		);
	});

	const importButton = (
		<View className="p-4">
			<Button block color="primary" formType="submit">
				导入
			</Button>
		</View>
	);

	const form = (
		<Form
			onSubmit={(e) => {
				const { group } = e.detail.value as { group: Group };

				const innerGroupId = groupId || group.id;

				if (!innerGroupId) return;

				handleImport(+innerGroupId);
			}}
			controlAlign="right"
		>
			<Cell.Group>
				<Field
					className={classNames({
						hidden: !!groupId,
					})}
					label="班级"
					name="group"
					rules={[
						{
							required: true,
							message: "请选择班级",
						},
					]}
				>
					{({ value, onChange, onBlur }) => {
						return (
							<GroupList value={value} onChange={onChange} onBlur={onBlur}>
								<Input placeholder="请选择" readonly value={value?.name} />
							</GroupList>
						);
					}}
				</Field>
			</Cell.Group>
			{importButton}
		</Form>
	);

	return (
		<>
			{guide}

			{form}
		</>
	);
}
