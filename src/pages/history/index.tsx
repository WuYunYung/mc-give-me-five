import { View, Image } from "@tarojs/components";
import { List, Loading, Search, Toast } from "@taroify/core";
import { useState } from "react";
import { ActivityRead } from "@/api";
import ActivityCard from "../../components/ActivityCard";
import defaultPage from "../../static/default/default.svg";

definePageConfig({
	navigationBarTitleText: "历史",
});

export default function History() {
	const [value, setValue] = useState<string>("");
	const [open, setOpen] = useState(false);

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

	const renderDefault = (
		<Image className="w-32 h-32 m-auto" src={defaultPage} />
	);

	const renderSearch = (
		<>
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
		</>
	);

	return (
		<View>
			{renderSearch}

			<View className="flex flex-col p-4">
				{!list.length && renderDefault}
				{list.length && renderList}
			</View>
		</View>
	);
}
