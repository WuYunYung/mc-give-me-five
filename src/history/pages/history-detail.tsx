import { activityAttend, activityQuit, activityRead } from "@/api";
import { View } from "@tarojs/components";
import ActivityDetailCard from "../../components/ActivityDetailCard";
import { Button, Divider, SafeArea } from "@taroify/core";
import dayjs from "dayjs";
import {
	useRouter,
	showModal,
	setNavigationBarTitle,
	showToast,
} from "@tarojs/taro";
import { useRequest } from "ahooks";
import { routePush } from "@/shared/route";
import useStore from "@/shared/store";
import useBackShow from "@/hooks/useBackShow";
import { showToastAsync } from "@/shared/utils";
import { FC, PropsWithChildren, useMemo } from "react";
import { Checked, Warning } from "@taroify/icons";

const ActivityStatus: FC<
	PropsWithChildren<{
		type: "success" | "warning";
	}>
> = (props) => {
	const { type, children } = props;

	const iconSize = 16;

	const icon =
		type === "success" ? (
			<Checked className="text-green-600" size={iconSize} />
		) : (
			<Warning className="text-gray-600" size={iconSize} />
		);

	return (
		<Divider>
			<View className="flex gap-2 items-center">
				{icon}
				{children}
			</View>
		</Divider>
	);
};

export default function () {
	const { params } = useRouter();

	const { id } = params;

	const { data: activity, refresh } = useRequest(activityRead, {
		defaultParams: [Number(id)],
		ready: !!id,
		onSuccess(res) {
			setNavigationBarTitle({ title: `${res.name}` });
		},
	});

	useBackShow(refresh);

	const { run: attendActivity } = useRequest(activityAttend, {
		manual: true,
		defaultParams: [Number(id)],
		onSuccess() {
			showToast({
				title: "签到成功",
				icon: "success",
			});

			refresh();
		},
	});

	const { run: quitActivity } = useRequest(activityQuit, {
		manual: true,
		onSuccess() {
			refresh();
		},
	});

	const handleAttendActivity = (id: number) => {
		if (activity && activity?.get_attenders_count < activity?.capacity) {
			showModal({
				title: "提示",
				content: "确定报名吗？",
				success: function (res) {
					if (res.confirm) {
						attendActivity(id);
					}
				},
			});
		} else {
			showToastAsync({
				title: "人数已满",
				icon: "error",
			});
		}
	};

	//用户取消报名
	const handleQuit = () => {
		showModal({
			title: "提示",
			content: "确定取消报名吗？",
			success: function (res) {
				if (res.confirm) {
					quitActivity(Number(id));
				}
			},
		});
	};

	//老师生成签到码
	const handleFindCode = () => {
		routePush("/history/pages/detail/detail-qrcode", {
			id: id,
		});
	};

	//老师查看活动报名详情
	const handleNavigateToAttender = () => {
		routePush("/feature/pages/history-detail-attender", {
			id: id,
		});
	};

	//老师更改活动信息
	const handleChange = () => {
		routePush("/manage/pages/create-activity", {
			id: id,
		});
	};

	const { user } = useStore();

	const { isAdmin } = user || {};

	const activityStatus = useMemo(() => {
		const { start_time, end_time } = activity || {};

		const now = new Date();

		const compareUnit = "minute" as const;

		const started = start_time && dayjs(start_time).isBefore(now, compareUnit);
		const finish = end_time && dayjs(end_time).isBefore(now, compareUnit);

		return {
			started,
			inProgress: started && !finish,
			finish,
		};
	}, [activity]);

	const studentAttendEntries = (
		<>
			{/* 学生-活动未开始 */}
			{!activityStatus.started && (
				<>
					<ActivityStatus type="success">已报名</ActivityStatus>

					<Button block color="default" onClick={handleQuit}>
						取消报名
					</Button>
				</>
			)}

			{/* 学生-活动已开始未结束 */}
			{activityStatus.inProgress && (
				<ActivityStatus type="success">
					{activity?.is_signed ? "已签到" : "已报名"}
				</ActivityStatus>
			)}

			{/* 学生-活动已结束 */}
			{activityStatus.finish && (
				<>
					{activity?.is_signed ? (
						<ActivityStatus type="success">已签到</ActivityStatus>
					) : (
						<ActivityStatus type="warning">已结束（未签到）</ActivityStatus>
					)}
				</>
			)}
		</>
	);

	const studentEntries = (
		<>
			{/* 学生-未报名活动 */}
			{!activity?.is_attend ? (
				<Button
					color="primary"
					block
					onClick={() => handleAttendActivity(Number(id))}
				>
					报名
				</Button>
			) : (
				studentAttendEntries
			)}
		</>
	);

	const renderButtons = (
		<View className="flex flex-col p-4 gap-4">
			{!isAdmin && studentEntries}

			{/* 老师-管理活动 */}
			{isAdmin && activity && (
				<>
					<Button block color="primary" onClick={handleFindCode}>
						生成签到码
					</Button>
					<Button
						block
						variant="outlined"
						color="primary"
						onClick={handleChange}
					>
						编辑活动
					</Button>
					<Button
						block
						variant="outlined"
						color="primary"
						onClick={handleNavigateToAttender}
					>
						查看详情
					</Button>
				</>
			)}
		</View>
	);

	return (
		<View className="flex flex-col">
			{activity && (
				<ActivityDetailCard activityDetail={activity}></ActivityDetailCard>
			)}

			{renderButtons}

			<SafeArea position="bottom" />
		</View>
	);
}
