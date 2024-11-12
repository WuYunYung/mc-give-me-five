import {
	activityAttend,
	activityQuit,
	activityRead,
	activitySignin,
} from "@/api";
import { View } from "@tarojs/components";
import ActivityDetailCard from "../../components/ActivityDetailCard";
import { Button, SafeArea } from "@taroify/core";
import dayjs from "dayjs";
import { useRouter, scanCode, showModal, showToast } from "@tarojs/taro";
import { useRequest } from "ahooks";
import { routePush } from "@/shared/route";
import useStore from "@/shared/store";
import useBackShow from "@/hooks/useBackShow";

export default function () {
	const { params } = useRouter();

	const { id } = params;

	const { data: activity, refresh } = useRequest(activityRead, {
		defaultParams: [Number(id)],
		ready: !!id,
	});

	useBackShow(refresh);

	const { run: attendActivity } = useRequest(activityAttend, {
		manual: true,
		defaultParams: [Number(id)],
		onSuccess() {
			showToast({
				title: "成功",
				icon: "success",
				duration: 2000,
			});

			refresh();
		},
	});

	const { run: signActivity } = useRequest(activitySignin, {
		manual: true,
		onSuccess() {
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
			attendActivity(id);
		} else {
			showToast({
				title: "人数已满",
				icon: "error",
				duration: 2000,
			});
		}
	};

	//用户签到
	const handleSigned = () => {
		scanCode({
			// onlyFromCamera: true,
			success: (res) => {
				//通过扫码得到的内容发起请求
				signActivity(res.code);
			},
		});
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
		// findCode(Number(id));
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

	const renderButtons = (
		<>
			{/* 学生-未报名活动 */}
			{!isAdmin && !activity?.is_attend && (
				<View className="p-4">
					<Button
						color="primary"
						block
						onClick={() => handleAttendActivity(Number(id))}
					>
						报名
					</Button>
				</View>
			)}

			{/* 学生-已报名活动 */}

			{/* 学生-活动未开始 */}
			{!isAdmin &&
				activity &&
				activity?.is_attend &&
				dayjs(activity.start_time).valueOf() > dayjs().valueOf() && (
					<View className="flex flex-col gap-4 p-4">
						<Button block color="success" onClick={handleSigned}>
							等待签到确认
						</Button>
						<Button block color="default" onClick={handleQuit}>
							取消报名
						</Button>
					</View>
				)}

			{/* 学生-活动已开始未结束 */}
			{!isAdmin &&
				activity &&
				activity?.is_attend &&
				dayjs(activity.start_time).valueOf() < dayjs().valueOf() &&
				dayjs(activity.end_time).valueOf() > dayjs().valueOf() && (
					<View className="flex flex-col gap-4 p-4">
						<Button block color="success" onClick={handleSigned}>
							等待签到确认
						</Button>
					</View>
				)}

			{/* 学生-活动已结束 */}
			{!isAdmin &&
				activity &&
				activity?.is_attend &&
				dayjs(activity.end_time).valueOf() < dayjs().valueOf() && (
					<View className="flex flex-col gap-4 p-4">
						{activity.is_signed && (
							<Button block color="primary">
								已参加
							</Button>
						)}

						{!activity.is_signed && (
							<Button block color="warning">
								已结束（未签到）
							</Button>
						)}
					</View>
				)}

			{/* 老师-活动未结束 */}
			{isAdmin &&
				activity &&
				dayjs(activity.end_time).valueOf() > dayjs().valueOf() && (
					<View className="flex flex-col gap-4 px-4 pt-4">
						<Button block color="primary" onClick={handleFindCode}>
							生成签到码
						</Button>
					</View>
				)}

			{/* 老师-管理活动 */}
			{isAdmin && activity && (
				<View className="flex flex-col p-4 gap-4">
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
				</View>
			)}
		</>
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
