import {
	manageAttenderCreate,
	manageAttenderDelete,
	manageAttenderList,
} from "@/api";
import { routePush } from "@/shared/route";
import {
	ActionSheet,
	Button,
	Cell,
	FloatingBubble,
	SafeArea,
	SwipeCell,
} from "@taroify/core";
import { AppsOutlined } from "@taroify/icons";
import { Text, View } from "@tarojs/components";
import {
	env,
	getFileSystemManager,
	shareFileMessage,
	showModal,
	showToast,
	useDidShow,
	useRouter,
} from "@tarojs/taro";
import { useRequest } from "ahooks";
import { produce } from "immer";
import { useMemo, useState } from "react";
import { utils, write } from "xlsx";

enum SelectType {
	Leading = 0,
	delete = 1,
	export = 2,
}

export default function () {
	const { params } = useRouter();

	const { id } = params;

	const [open, setOpen] = useState(false);
	const actions = useMemo(
		() => [
			{
				name: "导入",
				value: SelectType.Leading,
				subname: "导入参与活动学生列表",
			},
			// {
			// 	name: "删除",
			// 	value: SelectType.delete,
			// 	subname: "全量删除该活动学生列表",
			// },
			{
				name: "导出",
				value: SelectType.export,
				subname: "全量导出学生签到信息",
			},
		],
		[],
	);

	const onOffsetChange = () => {
		setOpen(!open);
	};

	const {
		run: findAttender,
		data: attenders,
		mutate,
	} = useRequest((id) => manageAttenderList({ activity_id: id }), {
		onSuccess(res) {
			console.log(res);
		},
	});

	const { run: deleteAttender } = useRequest(manageAttenderDelete, {
		manual: true,
		onSuccess(_, [id]) {
			showToast({
				title: "删除成功",
				icon: "success",
				duration: 2000,
			});

			mutate((prev) => {
				return produce(prev, (draft) => {
					if (!draft) return;

					draft.results = draft.results.filter((item) => item.id !== id);
				});
			});
		},
	});

	const { run: updateAttender } = useRequest(manageAttenderCreate, {
		manual: true,
		onSuccess(res, [{ usernames }]) {
			showToast({
				title: "修改成功",
				icon: "success",
				duration: 2000,
			});

			mutate((prev) => {
				return produce(prev, (draft) => {
					const userIdSet = new Set(usernames);

					console.log("res=>", res, "draft=>", draft);

					draft?.results.forEach((item) => {
						if (!userIdSet.has(item.user.username)) return;

						item.status = !item.status;
					});
				});
			});
		},
	});

	const exportToExcel = async () => {
		try {
			const transformAttendee = (item) => ({
				grade: item.user.group.grade.name,
				group: item.user.group.name,
				name: item.user.name,
				phone: item.user.phone,
				username: item.user.username,
				status: item.status,
			});

			const transformedAttendees = attenders?.results?.map(transformAttendee);

			// 创建工作簿
			const workbook = utils.book_new();

			// 创建工作表
			const worksheet = utils.json_to_sheet(transformedAttendees!);

			// 将工作表添加到工作簿
			utils.book_append_sheet(workbook, worksheet, "Sheet1");

			// 将工作簿写入二进制字符串
			const wbout = write(workbook, { bookType: "xlsx", type: "binary" });

			// 将二进制字符串转换为ArrayBuffer
			const s2ab = (s) => {
				const buf = new ArrayBuffer(s.length);
				const view = new Uint8Array(buf);
				for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
				return buf;
			};

			const buffer = s2ab(wbout);

			// 生成临时文件路径
			const tempFilePath = `${env.USER_DATA_PATH}/temp.xlsx`;

			// 使用微信小程序的 writeFile 方法写入文件
			getFileSystemManager().writeFile({
				filePath: tempFilePath,
				data: buffer,
				encoding: "binary",
				success: (res) => {
					console.log("文件写入成功", res);

					// openDocument({
					// 	filePath: tempFilePath,
					// 	success: function (res) {
					// 		console.log(tempFilePath);
					// 		console.log("打开文档成功", res);
					// 	},
					// });

					showModal({
						content: "导出成功，分享至好友",
						success() {
							shareFileMessage({
								filePath: tempFilePath,
								fileName: "test.xlsx",
								complete(res) {
									console.log("shareFileMessage", res);
								},
							});
						},
					});
				},
				fail: (err) => {
					console.error("文件写入失败:", err);
					throw new Error("文件写入失败");
				},
			});
			// downloadFile({
			// 	url: base64String, //仅为示例，并非真实的资源
			// 	success: function (res) {
			// 		// 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
			// 		console.log(res);
			// 	},
			// });
		} catch (error) {
			showToast({ title: "导出失败", icon: "none" });
			console.error("导出文件失败:", error);
		}
	};

	const handleSelect = (e) => {
		if (e.value === SelectType.Leading) {
			routePush("/history/pages/detail/detail-import", {
				id: id,
			});
		} else if (e.value === SelectType.delete) {
		} else if (e.value === SelectType.export) {
			exportToExcel();
		}
	};

	const handleDelete = (signId: number) => {
		deleteAttender(signId);
	};

	const handleUpdate = (
		activity: number,
		username: string,
		status: boolean,
	) => {
		updateAttender({
			usernames: [username],
			status,
			activity,
		});
	};

	useDidShow(() => {
		findAttender(id);
	});
	return (
		<View>
			<Cell>
				<Text className="font-bold text-xl">活动用户</Text>
			</Cell>
			<Cell.Group bordered={false}>
				<Cell title="学生信息">状态</Cell>
				{attenders?.results.map((item) => (
					<SwipeCell key={item.id}>
						<Cell title={item.user.name} brief={item.user.username}>
							{item.status ? "已签到" : "未签到"}
						</Cell>
						<SwipeCell.Actions side="right">
							<Button
								className="h-full"
								variant="contained"
								shape="square"
								color="primary"
								onClick={() => {
									// e.stopPropagation();
									handleUpdate(
										item.activity,
										item.user.username!,
										!item.status,
									);
								}}
							>
								修改
							</Button>
							<Button
								className="h-full"
								variant="contained"
								shape="square"
								color="danger"
								onClick={() => handleDelete(item.id!)}
							>
								删除
							</Button>
						</SwipeCell.Actions>
					</SwipeCell>
				))}
			</Cell.Group>

			<FloatingBubble
				axis="xy"
				magnetic="x"
				icon={<AppsOutlined />}
				onClick={onOffsetChange}
			/>

			<ActionSheet
				cancelText="取消"
				actions={actions}
				open={open}
				onSelect={handleSelect}
				onCancel={() => setOpen(false)}
				onClose={() => setOpen(false)}
			/>
			<SafeArea position="bottom" />
		</View>
	);
}
