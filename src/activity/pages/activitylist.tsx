import { Image, View } from "@tarojs/components";
import defaultPage from "../../static/default/default.svg";
import { List, Loading } from "@taroify/core";
import { useState } from "react";
import ActivityCard from "../../components/ActivityCard";
import { ActivityRead } from "@/api";

definePageConfig({
	navigationBarTitleText: "give me five",
	navigationBarBackgroundColor: "#930a41",
});

export default function () {
	const [hasMore, setHasMore] = useState(true);
	const [list, setList] = useState<ActivityRead[]>([
		{
			id: 0,
			name: "crazy thursday",
			description: "what can i say",
			creator: {
				name: "teacher ma",
				username: "1234567890",
				phone: "13060649844",
			},
			get_attenders_count: 62,
			capacity: 70,
			location: "shenzhen university",
			start_time: "",
			end_time: "",
			type: 0,
		},
	]);
	const [loading, setLoading] = useState(false);

	const renderList = (
		<List
			loading={loading}
			hasMore={hasMore}
			onLoad={() => {
				setLoading(true);
				setTimeout(() => {
					for (let i = 0; i < 5; i++) {
						list.push({
							id: 0,
							name: "crazy thursday",
							description: "what can i say",
							creator: {
								name: "teacher ma",
								username: "1234567890",
								phone: "13060649844",
							},
							get_attenders_count: 62,
							capacity: 70,
							location: "shenzhen university",
							start_time: "",
							end_time: "",
							type: 0,
						});
					}
					setList([...list]);
					setHasMore(list.length < 10);
					setLoading(false);
				}, 1000);
			}}
		>
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

	const renderDefault = (
		<Image className="w-32 h-32 m-auto" src={defaultPage} />
	);

	return (
		<View>
			<View className="flex flex-col p-4">
				{!list.length && renderDefault}
				{list.length && renderList}
			</View>
		</View>
	);
}
