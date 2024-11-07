import {
	activityQuit,
	activityRead,
	ActivityReadDetail,
	activitySignin,
	manageActivityGenerateCode,
} from "@/api";
import { View } from "@tarojs/components";
import ActivityDetailCard from "../../components/ActivityDetailCard";
import { Button, SafeArea } from "@taroify/core";
import dayjs from "dayjs";
import { useRouter, scanCode, getStorageSync, showModal } from "@tarojs/taro";
import { useState } from "react";
import { useRequest } from "ahooks";
import CodeCreator from "taro-code-creator";
import { routePush } from "@/shared/route";

export default function () {
	const { params } = useRouter();

	const { id } = params;

	const [activity, setactivity] = useState<ActivityReadDetail>();

	const [qrCode, setqrCode] = useState("");

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

	const { run: quitActv } = useRequest(activityQuit, {
		manual: true,
		onSuccess() {
			//...
			findActv(Number(id));
		},
	});

	const { run: findCode, loading: findCodeLoading } = useRequest(
		manageActivityGenerateCode,
		{
			manual: true,
			pollingInterval: 10000,
			pollingWhenHidden: false,
			onSuccess(res) {
				console.log("code=>", res.code);
				setqrCode(res.code);
			},
		},
	);

	// const { run: findAttender } = useRequest(manageAttenderRead, {
	// 	manual: true,
	// 	onSuccess() {

	// 	}
	// })

	//用户签到
	const handleSigned = () => {
		scanCode({
			// onlyFromCamera: true,
			success: (res) => {
				//通过扫码得到的内容发起请求
				signActv(res.code);
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
					quitActv(Number(id));
				}
			},
		});
		quitActv(Number(id));
	};

	//老师生成签到码
	const handleFindCode = () => {
		findCode(Number(id));
	};

	//老师查看活动报名详情
	const handleNavigateToAttender = () => {
		routePush("/history/pages/history-attender", {
			id: id,
		});
	};

	const renderButtons = (
		<>
			{/* 学生-活动未开始 */}
			{!JSON.parse(getStorageSync("store")).state.user.isAdmin &&
				activity &&
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
			{!JSON.parse(getStorageSync("store")).state.user.isAdmin &&
				activity &&
				dayjs(activity.start_time).valueOf() < dayjs().valueOf() &&
				dayjs(activity.end_time).valueOf() > dayjs().valueOf() && (
					<View className="flex flex-col gap-4 p-4">
						<Button block color="success" onClick={handleSigned}>
							等待签到确认
						</Button>
					</View>
				)}

			{/* 学生-活动已结束 */}
			{!JSON.parse(getStorageSync("store")).state.user.isAdmin &&
				activity &&
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
			{JSON.parse(getStorageSync("store")).state.user.isAdmin &&
				activity &&
				dayjs(activity.end_time).valueOf() > dayjs().valueOf() && (
					<View className="flex flex-col gap-4 p-4">
						<Button block color="primary" onClick={handleFindCode}>
							生成签到码
						</Button>

						<View className="mx-auto mt-4">
							{!findCodeLoading && qrCode !== "" && (
								<CodeCreator codeText={qrCode} size={256}></CodeCreator>
							)}
						</View>
					</View>
				)}

			{/* 老师-活动已结束 */}
			{JSON.parse(getStorageSync("store")).state.user.isAdmin &&
				activity &&
				dayjs(activity.end_time).valueOf() < dayjs().valueOf() && (
					<View className="flex flex-col p-4">
						<Button block color="primary" onClick={handleNavigateToAttender}>
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
