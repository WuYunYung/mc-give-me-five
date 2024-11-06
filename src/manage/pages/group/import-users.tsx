import { manageRegisterBatchRegister } from "@/api";
import { Pattern } from "@/shared/pattern";
import { routeBack } from "@/shared/route";
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
import ExcelJS from "exceljs";
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
	// 创建 ExcelJS 工作簿实例
	const workbook = new ExcelJS.Workbook();

	await workbook.xlsx.load(fileBuffer); // 加载 Excel 文件数据

	// 获取第一个工作表
	const worksheet = workbook.worksheets[0];

	// 获取工作表的所有行，转换为矩阵
	const matrix: ExcelJS.CellValue[][] = [];
	worksheet.eachRow({ includeEmpty: true }, (row) => {
		if (!Array.isArray(row?.values)) return;

		const value = row.values.slice?.(1);

		value && matrix.push(value); // row.values[0] 是行索引，slice(1) 去掉
	});

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
				routeBack();
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
		const matrix: ExcelJS.CellValue[][] = await getTableMatrixByFile(
			fileData.data as ArrayBuffer,
		);

		const validMatirx = matrix.filter((row) => {
			const [userName, name] = row;

			if (
				Number.isNaN(Number(userName)) ||
				!Pattern.userName.test(userName?.toString() || "")
			) {
				return false;
			}

			const validName = Pattern.name.test(name);

			if (!isString(name) || !validName) {
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
