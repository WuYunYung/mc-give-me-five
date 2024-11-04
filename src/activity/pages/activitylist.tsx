import { activityList, ActivityRead } from "@/api";
import { List, Loading } from "@taroify/core";
import { Image, View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useLatest, useRequest } from "ahooks";
import { isNil } from "lodash-es";
import { useState } from "react";
import ActivityCard from "../../components/ActivityCard";
import defaultPage from "../../static/default/default.svg";

definePageConfig({
	navigationBarTitleText: "give me five",
	navigationBarBackgroundColor: "#930a41",
});

type Type = "0" | "1" | "2" | "3";

const LIMIT = 10;

export default function () {
	const { params } = useRouter<{
		type?: Type;
	}>();
	const { type } = params;

	const [list, setList] = useState<ActivityRead[]>([]);

	const latestList = useLatest(list);

	const [flag, setFlag] = useState<boolean>(true);

	const { run, loading, data } = useRequest(activityList, {
		ready: !isNil(type),
		manual: true,
		onSuccess({ results = [] }) {
			setFlag(false);
			setList((prev) => [...prev, ...results]);
		},
	});

	const hasMore = !data || data.results?.length === LIMIT;

	const renderDefault = (
		<View className="flex">
			<Image className="w-32 h-32 m-auto" src={defaultPage} />
		</View>
	);

	const renderList = (
		<List
			loading={loading}
			hasMore={hasMore}
			onLoad={() => {
				run({
					type,
					limit: LIMIT,
					offset: latestList.current.length,
				});
			}}
		>
			{list.length === 0 && !flag && renderDefault}
			{list.map((item: ActivityRead, index: number) => (
				<ActivityCard
					activityDetail={item}
					mode="activity"
					key={index}
				></ActivityCard>
			))}
			<List.Placeholder>
				{loading && <Loading>加载中...</Loading>}
				{!hasMore && "没有更多了"}
			</List.Placeholder>
		</List>
	);

	return (
		<View>
			<View className="flex flex-col p-4">{renderList}</View>
		</View>
	);
}
