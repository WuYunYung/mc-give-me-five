import { manageAttenderCreate } from "@/api";
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
import { read, utils } from "xlsx";

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
		id: string;
	}>();

	const { id } = params;

	const guide = (
		<Cell.Group bordered={false}>
			<Cell title="名单导入:" brief={"请选择一个excel文件"} />
			<View className="px-4">
				<Text className="text-sm text-gray-500">
					注意事项:文件大小限制为2MB，记录条数限制为300条，文件格式要求第一列为用户学号，学号必须是在6到10位的纯数字，其他非法学号将被忽略。
				</Text>
			</View>
		</Cell.Group>
	);

	const { run } = useRequest(manageAttenderCreate, {
		manual: true,
		onSuccess() {
			routeBack();
		},
	});

	const handleImport = useMemoizedFn(async () => {
		const { tempFiles } = await chooseMessageFile({
			count: 1,
			type: "file",
			extension: ["xls", "xlsx"],
		});

		const fileData = await readFile(tempFiles.at(0)?.path!);

		// 获取工作表的所有行，转换为矩阵
		const matrix = await getTableMatrixByFile(fileData.data as ArrayBuffer);

		if (!matrix.length) return;

		if (matrix.length > 300) {
			showModal({
				content: "记录条数限制为300条",
			});
			return;
		}

		return run({
			usernames: matrix.flat().map(String),
			activity: Number(id),
			status: false,
		});
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