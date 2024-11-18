import { routePush } from "@/shared/route";
import { ScrollView, Text, View } from "@tarojs/components";
import banner1 from "../../static/banner/banner1.svg";
import banner2 from "../../static/banner/banner2.svg";
import banner3 from "../../static/banner/banner3.svg";
import banner4 from "../../static/banner/banner4.svg";
import {
	Button,
	ConfigProvider,
	Image,
	PullRefresh,
	Skeleton,
} from "@taroify/core";
import useActivityCountByType from "@/hooks/useActivityCountByType";
import {
	scanCode,
	getMenuButtonBoundingClientRect,
	getWindowInfo,
} from "@tarojs/taro";
import { useMemo, useRef, useState } from "react";
import { ActivityStatus, Theme } from "@/shared/constants";
import useStore from "@/shared/store";
import { useRequest } from "ahooks";
import { ActivityRead, activitySignin } from "@/api";
import { Scan } from "@taroify/icons";
import { showToastAsync, wrapPromiseWith } from "@/shared/utils";
import { isEmpty } from "lodash-es";
import useBackShow from "@/hooks/useBackShow";

definePageConfig({
	navigationStyle: "custom",
	disableScroll: true,
});

type Type = "0" | "1" | "2" | "3";

const imageUrl = [banner1, banner2, banner3, banner4];

export default function Index() {
	const { user } = useStore();

	const { data, forceRefreshAsync, loading, refresh } = useActivityCountByType({
		ready: !!user,
	});

	useBackShow(() => {
		isEmpty(data) && refresh();
	});

	const { run: signActivity } = useRequest(
		activitySignin as unknown as (query: {
			code: string;
		}) => Promise<ActivityRead>,
		{
			manual: true,
			async onSuccess(res) {
				await showToastAsync({
					title: "成功",
					icon: "success",
				});

				routePush("/history/pages/history-detail", {
					id: res.id,
				});
			},
		},
	);

	const handleNavigateTo = (type: Type) => {
		routePush("/activity/pages/activity-list", {
			type: type,
			status: ActivityStatus.running,
		});
	};

	//用户签到
	const handleSigned = async () => {
		const [, res] = await wrapPromiseWith(scanCode)({
			onlyFromCamera: true,
		});

		if (res) {
			//通过扫码得到的内容发起请求
			signActivity({ code: res.result });
		}
	};

	const renderSkeleton = new Array(4)
		.fill(null)
		.map((_, index) => (
			<Skeleton key={index} className="h-40 w-full rounded-lg opacity-70" />
		));

	const renderContent = data.map((item) => (
		<View
			key={item.type}
			className="w-full box-border h-40 bg-white flex flex-col border-solid border-gray-300 rounded-lg"
			onClick={() => {
				handleNavigateTo(item.type as Type);
			}}
		>
			<View className="relative w-full">
				<View className="absolute flex top-4 right-4 w-6 h-6 bg-primary-900">
					<Text className="m-auto text-white font-bold">{item.running}</Text>
				</View>
			</View>
			<Image className="box-border w-full h-40" src={imageUrl[item.type]} />
			<View className="relative bottom-8">
				<Text className="absolute ml-4 font-bold text-lg text-black">
					{`类型${item.type}`}
				</Text>
			</View>
		</View>
	));

	const renderMap = (
		<View className="flex flex-col p-4 gap-4">
			{isEmpty(data) ? renderSkeleton : renderContent}
		</View>
	);

	const pullDownRefreshLoading = useRef(false);

	const [reachTop, setReachTop] = useState(true);

	const { statusBarHeight, headerHeight } = useMemo(() => {
		const { statusBarHeight = 0 } = getWindowInfo();

		const { height, top } = getMenuButtonBoundingClientRect();

		const menuVerticalMargin = top - statusBarHeight;

		const headerHeight = menuVerticalMargin * 2 + height;

		return { statusBarHeight, headerHeight };
	}, []);

	const header = (
		<View
			className="bg-primary-900 w-full relative"
			style={{
				paddingTop: statusBarHeight,
			}}
		>
			<View
				className="flex justify-center items-center "
				style={{
					height: headerHeight,
				}}
			>
				<Button
					className="text-white absolute left-0"
					icon={<Scan size={20} />}
					variant="text"
					onClick={handleSigned}
					shape="square"
				></Button>

				<Text className="text-white">GiveMeFive</Text>
			</View>
		</View>
	);

	const content = (
		<ScrollView
			className="w-full overflow-scroll flex-1"
			style={{
				background: `linear-gradient(${Theme.Color.Primary}, ${Theme.Color.White})`,
			}}
			onScroll={(e) => {
				setReachTop(e.detail.scrollTop <= 10);
			}}
			scrollY
		>
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
		</ScrollView>
	);

	return (
		<View className="w-full h-screen flex flex-col">
			{header}

			{content}
		</View>
	);
}
