import {
	activityRead,
	manageAttenderCreate,
	manageAttenderDelete,
	manageAttenderList,
} from "@/api";
import { routePush } from "@/shared/route";
import { showToastAsync, wrapPromiseWith } from "@/shared/utils";
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
	shareFileMessage,
	showModal,
	showToast,
	useDidShow,
	useRouter,
} from "@tarojs/taro";
import { useRequest } from "ahooks";
import { produce } from "immer";
import { useMemo, useState } from "react";
import { getExcelFileByTableMatrix, PromiseLike } from "../utils";

const enum SelectType {
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
				subTitle: "导入参与活动学生列表",
			},
			{
				name: "导出",
				value: SelectType.export,
				subTitle: "全量导出学生签到信息",
			},
		],
		[],
	);

	const onOffsetChange = () => {
		setOpen(!open);
	};

	const { data: activity } = useRequest(activityRead, {
		defaultParams: [Number(id)],
		ready: !!id,
	});

	const {
		run: findAttender,
		data: attenders,
		mutate,
	} = useRequest((id) => manageAttenderList({ activity_id: id }));

	const { run: deleteAttender } = useRequest(manageAttenderDelete, {
		manual: true,
		onSuccess(_, [id]) {
			showToastAsync({
				title: "删除成功",
				icon: "success",
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
		onSuccess(_, [{ usernames }]) {
			showToastAsync({
				title: "修改成功",
				icon: "success",
			});

			mutate((prev) => {
				return produce(prev, (draft) => {
					const userIdSet = new Set(usernames);

					draft?.results.forEach((item) => {
						if (!userIdSet.has(item.user.username)) return;

						item.status = !item.status;
					});
				});
			});
		},
	});

	const exportToExcel = async () => {
		const transformedAttendees = attenders?.results?.map((item) => ({
			年级: item.user.group.grade.name,
			班级: item.user.group.name,
			学生姓名: item.user.name,
			学生电话: item.user.phone,
			学生学号: item.user.username,
			活动状态: item.status ? "已签到" : "未签到",
		}));

		if (!transformedAttendees) {
			showToast({
				title: "暂无数据",
			});
			return;
		}

		const buffer = getExcelFileByTableMatrix(transformedAttendees!);

		// 生成临时文件路径
		const tempFilePath = `${env.USER_DATA_PATH}/temp.xlsx`;

		// 使用微信小程序的 writeFile 方法写入文件
		const [error] = await wrapPromiseWith(PromiseLike.writeFile)(
			tempFilePath,
			buffer,
		);

		if (error) {
			showToast({ title: "导出失败", icon: "none" });
			return;
		}

		const [, res] = await wrapPromiseWith(showModal)({
			content: "导出成功，分享至好友",
		});

		if (res) {
			shareFileMessage({
				filePath: tempFilePath,
				fileName: `${activity?.name}.xlsx`,
			});
		}
	};

	const handleSelect = (e) => {
		if (e.value === SelectType.Leading) {
			routePush("/feature/pages/history-detail-import", {
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
