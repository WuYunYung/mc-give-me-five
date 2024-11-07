import { Button } from "@taroify/core";
import { View } from "@tarojs/components";
import ActivityDetailCard from "../../components/ActivityDetailCard";
import { activityAttend, activityRead, ActivityReadDetail } from "@/api";
import { useRouter, showToast, getStorageSync } from "@tarojs/taro";
import { useRequest } from "ahooks";
import { useState } from "react";
import dayjs from "dayjs";

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

	const { run: attendActv } = useRequest(activityAttend, {
		manual: true,
		defaultParams: [Number(id)],
		onSuccess() {
			showToast({
				title: "成功",
				icon: "success",
				duration: 2000,
			});

			findActv(Number(id));
		},
	});

	const handleAttendActivity = (id: number) => {
		//管理员无需报名
		if (JSON.parse(getStorageSync("store")).state.user.isAdmin) {
			showToast({
				title: "您无需报名",
				icon: "success",
				duration: 2000,
			});
		} else {
			if (activity && activity?.get_attenders_count < activity?.capacity) {
				attendActv(id);
			} else {
				showToast({
					title: "人数已满",
					icon: "error",
					duration: 2000,
				});
			}
		}
	};

	return (
		<View className="flex flex-col">
			{activity && (
				<ActivityDetailCard activityDetail={activity}></ActivityDetailCard>
			)}

			<View className="p-4">
				<Button
					color="primary"
					block
					onClick={() => handleAttendActivity(Number(id))}
				>
					{activity && !dayjs(activity.start_time).isBefore(dayjs())
						? activity.is_attend
							? "已报名"
							: "报名"
						: "已结束"}
				</Button>
			</View>
		</View>
	);
}
