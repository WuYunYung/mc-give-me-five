import { manageRegisterBatchRegister } from "@/api";
import { Pattern } from "@/shared/pattern";
import { routeRedirect } from "@/shared/route";
import { Button, Cell } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import {
	useRouter,
	chooseMessageFile,
	getFileSystemManager,
	FileSystemManager,
	showModal,
} from "@tarojs/taro";
import { useMemoizedFn, useRequest } from "ahooks";
import { read, utils } from "xlsx";
import { isString } from "lodash-es";

async function readFile(
	filePath: string,
): Promise<FileSystemManager.ReadFileSuccessCallbackResult> {
	return new Promise((resolve, reject) => {
		getFileSystemManager().readFile({
			filePath: filePath,
			encoding: "binary",
			success: resolve,
			fail: reject,
		});
	});
}

async function getTableMatrixByFile(fileBuffer: ArrayBuffer) {
	// 使用 xlsx 库来读取文件
	const workbook = read(fileBuffer, { type: "binary" });

	// 获取第一个工作表
	const worksheet = workbook.Sheets[workbook.SheetNames[0]];

	// 将工作表数据转换为二维数组（矩阵）
	const matrix: (string | number | boolean)[][] = utils.sheet_to_json(
		worksheet,
		{ header: 1 },
	);

	return matrix;
}

export default function () {
	const { params } = useRouter<{
		groupId: string;
	}>();

	const { groupId } = params;

	const guide = (
		<Cell.Group bordered={false}>
			<Cell title="名单导入:" brief={"请选择一个excel文件"} />
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

	const handleImport = useMemoizedFn(async () => {
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
			<Button block color="primary" onClick={handleImport}>
				导入
			</Button>
		</View>
	);

	return (
		<>
			{guide}

			{importButton}
		</>
	);
}
