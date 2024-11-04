import { ActivityRead } from "@/api";
import { View } from "@tarojs/components";
import React from "react";
import ActivityDetailCard from "../../components/ActivityDetailCard";
import { Button } from "@taroify/core";
import dayjs from "dayjs";

const activity: ActivityRead = {
	id: 0,
	name: "crazy thursday",
	description:
		"what can i say what can i say what can i say what can i say what can i say",
	creator: {
		name: "teacher ma",
		username: "1234567890",
		phone: "13060649844",
	},
	get_attenders_count: 62,
	capacity: 70,
	location: "shenzhen university",
	start_time: "2020-11-18 21:15",
	end_time: "2020-11-18 22:21",
	type: 0,
};

const renderButtons = (
	<>
		{/* 活动未开始 */}
		{dayjs(activity.start_time).valueOf() > dayjs().valueOf() && (
			<View className="flex flex-col">
				<Button color="success" className="w-4/5 mx-auto mt-4">
					等待签到确认
				</Button>
				<Button color="default" className="w-4/5 mx-auto mt-4">
					取消报名
				</Button>
			</View>
		)}

		{/* 活动已开始未结束 */}
		{dayjs(activity.start_time).valueOf() < dayjs().valueOf() &&
			dayjs(activity.end_time).valueOf() > dayjs().valueOf() && (
				<View className="flex flex-col">
					<Button color="success" className="w-4/5 mx-auto mt-4">
						等待签到确认
					</Button>
				</View>
			)}

		{/* 活动已结束 */}
		{dayjs(activity.end_time).valueOf() < dayjs().valueOf() && (
			<View className="flex flex-col">
				{}
				<Button color="primary" className="w-4/5 mx-auto mt-4">
					已参加
				</Button>
				<Button color="warning" className="w-4/5 mx-auto mt-4">
					已结束（未签到）
				</Button>
			</View>
		)}
	</>
);

export default function () {
	return (
		<View className="flex flex-col">
			<ActivityDetailCard activityDetail={activity}></ActivityDetailCard>

			{renderButtons}
		</View>
	);
}
