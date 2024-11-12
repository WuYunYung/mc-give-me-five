import { routePush } from "@/shared/route";
import { Text, View } from "@tarojs/components";
import banner1 from "../../static/banner/banner1.svg";
import banner2 from "../../static/banner/banner2.svg";
import banner3 from "../../static/banner/banner3.svg";
import banner4 from "../../static/banner/banner4.svg";
import scan1 from "../../static/scan/scanCode.svg";
import { ConfigProvider, Image, PullRefresh } from "@taroify/core";
import useActivityCountByType from "@/hooks/useActivityCountByType";
import {
	usePageScroll,
	scanCode,
	showToast,
	getMenuButtonBoundingClientRect,
} from "@tarojs/taro";
import { useRef, useState } from "react";
import { ActivityStatus, Theme } from "@/shared/constants";
import useStore from "@/shared/store";
import { useRequest } from "ahooks";
import { activitySignin } from "@/api";

definePageConfig({
	// navigationBarTitleText: "首页",
	navigationStyle: "custom",
	disableScroll: true,
});

type Type = "0" | "1" | "2" | "3";

const imageUrl = [banner1, banner2, banner3, banner4];

export default function Index() {
	const { user } = useStore();

	const { data, forceRefreshAsync, loading } = useActivityCountByType({
		ready: !!user,
	});

	const { run: signActv } = useRequest(activitySignin, {
		manual: true,
		onSuccess() {
			//...
			showToast({
				title: "成功",
				icon: "success",
				duration: 2000,
			});
		},
	});

	const handleNavigateTo = (type: Type) => {
		routePush("/activity/pages/activity-list", {
			type: type,
			status: ActivityStatus.running,
		});
	};

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

	const renderMap = (
		<View className="flex flex-col p-4 gap-4">
			{data.map((item) => (
				<View
					key={item.type}
					className="w-full box-border h-40 bg-white flex flex-col border-solid border-gray-300 rounded-lg"
					onClick={() => {
						handleNavigateTo(item.type as Type);
					}}
				>
					<View className="relative w-full">
						<View className="absolute flex top-4 right-4 w-6 h-6 bg-primary-900">
							<Text className="m-auto text-white font-bold">
								{item.running}
							</Text>
						</View>
					</View>
					<Image className="box-border w-full h-40" src={imageUrl[item.type]} />
					<View className="relative bottom-8">
						<Text className="absolute ml-4 font-bold text-lg text-black">
							{`类型${item.type}`}
						</Text>
					</View>
				</View>
			))}
		</View>
	);

	const pullDownRefreshLoading = useRef(false);

	const [reachTop, setReachTop] = useState(true);

	usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0));

	return (
		<View
			className="w-full h-screen overflow-scroll"
			style={{
				background: `linear-gradient(${Theme.Color.Primary}, ${Theme.Color.White})`,
			}}
		>
			<View
				className="sticky top-0 w-full bg-[#930a41] flex justify-center z-50"
				style={{
					height: `${getMenuButtonBoundingClientRect().top + getMenuButtonBoundingClientRect().height + 6.4}px`,
				}}
			>
				<View className="relative left-0 bottom-0 w-0">
					<View
						className="absolute bottom-0 w-7 h-7 ml-2 mb-[0.4rem] mt-auto bg-[#930a41]"
						onClick={handleSigned}
					>
						<Image className="w-7 h-7" src={scan1}></Image>
					</View>
				</View>

				<View className="mx-auto mb-3 mt-auto">
					<Text className="text-white">GiveMeFive</Text>
				</View>
			</View>
			<ConfigProvider
				theme={{
					pullRefreshHeadColor: Theme.Color.White,
					loadingColor: Theme.Color.White,
					loadingTextColor: Theme.Color.White,
				}}
			>
				<PullRefresh
					loading={pullDownRefreshLoading.current && loading}
					reachTop={reachTop}
					onRefresh={async () => {
						pullDownRefreshLoading.current = true;

						await forceRefreshAsync();

						pullDownRefreshLoading.current = false;
					}}
				>
					{renderMap}
				</PullRefresh>
			</ConfigProvider>
		</View>
	);
}
