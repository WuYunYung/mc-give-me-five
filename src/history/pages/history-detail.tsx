import { activityRead, ActivityReadDetail, activitySignin } from "@/api";
import { View } from "@tarojs/components";
import ActivityDetailCard from "../../components/ActivityDetailCard";
import { Button } from "@taroify/core";
import dayjs from "dayjs";
import { useRouter, scanCode, getStorageSync, showToast } from "@tarojs/taro";
import { useState } from "react";
import { useRequest } from "ahooks";

export default function () {
	const { params } = useRouter();

	const { id } = params;

	const [activity, setactivity] = useState<ActivityReadDetail>();

	const { run: findActv } = useRequest(activityRead, {
		defaultParams: [Number(id)],
		onSuccess(res) {
			setactivity(res);
		},
	});

	const { run: signActv } = useRequest(activitySignin, {
		manual: true,
		onSuccess() {
			//...
			findActv(Number(id));
		},
	});

	//用户签到
	const handleSigned = () => {
		//老师无需签到
		if (JSON.parse(getStorageSync("store")).state.user.isAdmin) {
			showToast({
				title: "您无需报名",
				icon: "success",
				duration: 2000,
			});
		} else {
			scanCode({
				// onlyFromCamera: true,
				success: () => {
					//通过扫码得到的内容发起请求
					signActv();
				},
			});
		}
	};

	//用户取消报名
	const handleQuit = () => {
		//老师无需签到
		if (JSON.parse(getStorageSync("store")).state.user.isAdmin) {
			showToast({
				title: "您无需报名",
				icon: "success",
				duration: 2000,
			});
		} else {
			//取消报名
		}
	};

	const renderButtons = (
		<>
			{/* 活动未开始 */}
			{activity && dayjs(activity.start_time).valueOf() > dayjs().valueOf() && (
				<View className="flex flex-col">
					<Button
						color="success"
						className="w-4/5 mx-auto mt-4"
						onClick={handleSigned}
					>
						等待签到确认
					</Button>
					<Button
						color="default"
						className="w-4/5 mx-auto mt-4"
						onClick={handleQuit}
					>
						取消报名
					</Button>
				</View>
			)}

			{/* 活动已开始未结束 */}
			{activity &&
				dayjs(activity.start_time).valueOf() < dayjs().valueOf() &&
				dayjs(activity.end_time).valueOf() > dayjs().valueOf() && (
					<View className="flex flex-col">
						<Button
							color="success"
							className="w-4/5 mx-auto mt-4"
							onClick={handleSigned}
						>
							等待签到确认
						</Button>
					</View>
				)}

			{/* 活动已结束 */}
			{activity && dayjs(activity.end_time).valueOf() < dayjs().valueOf() && (
				<View className="flex flex-col">
					{activity.is_signed && (
						<Button color="primary" className="w-4/5 mx-auto mt-4">
							已参加
						</Button>
					)}

					{!activity.is_signed && (
						<Button color="warning" className="w-4/5 mx-auto mt-4">
							已结束（未签到）
						</Button>
					)}
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
		</View>
	);
}
