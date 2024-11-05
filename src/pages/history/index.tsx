import { View, Image } from "@tarojs/components";
import { List, Loading, Search, Toast } from "@taroify/core";
import { useState } from "react";
import { activityList, ActivityRead } from "@/api";
import ActivityCard from "../../components/ActivityCard";
import defaultPage from "../../static/default/default.svg";
import { useLatest, useRequest } from "ahooks";
import { getStorageSync } from "@tarojs/taro";
import dayjs from "dayjs";

definePageConfig({
	navigationBarTitleText: "历史",
});

const LIMIT = 10;

export default function History() {
	const [value, setValue] = useState<string>("");
	const [open, setOpen] = useState(false);

	const [list, setList] = useState<ActivityRead[]>([]);

	const latestList = useLatest(list);

	const [flag, setFlag] = useState<boolean>(true);

	const { run, loading, data } = useRequest(activityList, {
		manual: true,
		onSuccess({ results = [] }) {
			console.log("results=>", results);
			setFlag(false);

			if (JSON.parse(getStorageSync("store")).state.user.isAdmin) {
				//老师可以看到所有活动
				setList((prev) => [...prev, ...results]);
			} else {
				//学生可以看到已报名的活动
				for (let item of results) {
					if (item.is_ettend) {
						setList((prev) => [...prev, item]);
					}
				}
			}
		},
	});

	const hasMore = !data || data.results?.length === LIMIT;

	const renderDefault = (
		<Image className="w-32 h-32 m-auto" src={defaultPage} />
	);

	const renderList = (
		<List
			loading={loading}
			hasMore={hasMore}
			onLoad={() => {
				run({
					limit: LIMIT,
					offset: latestList.current.length,
				});
			}}
		>
			{list.length === 0 && !flag && renderDefault}
			{list.map((item: ActivityRead, index: number) => (
				<ActivityCard
					activityDetail={item}
					mode="history"
					key={index}
				></ActivityCard>
			))}
			<List.Placeholder>
				{loading && <Loading>加载中...</Loading>}
				{!hasMore && "没有更多了"}
			</List.Placeholder>
		</List>
	);

	const renderSearch = (
		<View className="fixed w-full">
			<Toast open={open} onClose={() => setOpen(false)}>
				取消
			</Toast>
			<Search
				value={value}
				placeholder="请输入搜索关键词"
				action
				onChange={(e) => setValue(e.detail.value)}
				onCancel={() => setOpen(true)}
			/>
		</View>
	);

	return (
		<View>
			{renderSearch}

			<View className="flex flex-col p-4 pt-16">{renderList}</View>
		</View>
	);
}
