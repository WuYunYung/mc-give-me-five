import {
	Empty,
	FixedView,
	List,
	Loading,
	SafeArea,
	Search,
} from "@taroify/core";
import { Button } from "@taroify/core";
import { Plus } from "@taroify/icons";
import { ITouchEvent, View } from "@tarojs/components";
import {
	createSelectorQuery,
	getSystemInfoSync,
	useDidHide,
	useDidShow,
} from "@tarojs/taro";
import { useCreation, useMemoizedFn, useRequest, useUpdate } from "ahooks";
import { concat, isEmpty, merge, uniqueId } from "lodash-es";
import {
	ReactElement,
	ReactNode,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react";

type FeedsProps<T> = {
	service?: (params: {
		search?: string;
		limit?: number;
		offset: number;
	}) => Promise<T[]>;

	renderContent?: (list: T[]) => ReactNode;

	enableCreate?: boolean;
	onCreateClick?: (event: ITouchEvent) => void;
};

const LIMIT = 10;

/**
 * 列表组件
 *
 * 集成搜索、上拉加载、空状态
 * @TODO 下拉更新
 */
export default function Feeds<T>(props: FeedsProps<T>): ReactElement {
	const {
		service,
		renderContent,
		enableCreate: hasEmptyCreate,
		onCreateClick: onEmptyCreateClick,
	} = props;

	const list = useRef<T[]>([]);
	const search = useRef<string>("");
	const ready = useRef(false);
	const update = useUpdate();

	const { loading, runAsync, data } = useRequest(
		async (params?: Parameters<Exclude<typeof service, undefined>>[0]) =>
			service?.(
				merge(
					{
						search: search.current,
						limit: LIMIT,
						offset: list.current.length,
					},
					params,
				),
			),
		{
			manual: true,
		},
	);

	const hasMore = !data || data?.length === LIMIT;

	const searchRef = useRef();

	const handleClear = useMemoizedFn(async () => {
		const prevContent = search.current;

		search.current = "";
		list.current = [];
		if (!prevContent) return;
		const innerList = await runAsync();
		list.current = innerList || [];
		update();
	});

	const searchBarId = useCreation(() => uniqueId("feads-search-bar-"), []);
	const searchBarHeight = useRef(0);
	const windowHeight = useMemo(() => {
		const { windowHeight } = getSystemInfoSync();

		return windowHeight;
	}, []);

	const listHeight = windowHeight - searchBarHeight.current;

	useLayoutEffect(() => {
		if (ready.current) return;
		createSelectorQuery()
			.select(`#${searchBarId}`)
			.boundingClientRect((result) => {
				const rect = Array.isArray(result) ? result[0] : result;
				searchBarHeight.current = rect.height;
				ready.current = true;
				update();
			})
			.exec();
	}, [searchBarId, update]);

	const shouldDidShowAutoRefresh = useRef(false);

	const refreshList = useMemoizedFn(async () => {
		list.current = [];
		const innerList = await runAsync();
		list.current = innerList || [];
		update();
	});

	useDidShow(() => {
		if (!shouldDidShowAutoRefresh.current) return;

		refreshList();
	});

	useDidHide(() => {
		shouldDidShowAutoRefresh.current = true;
	});

	const renderSearch = (
		<View id={searchBarId}>
			<Search
				shape="rounded"
				ref={searchRef}
				placeholder="请输入搜索关键词"
				onSearch={async (e) => {
					const content = e.detail.value;
					if (content === search.current) return;
					search.current = content;
					list.current = [];
					const innerList = await runAsync();
					list.current = innerList || [];
					update();
				}}
				onClear={handleClear}
			/>
		</View>
	);

	const renderList = (
		<List
			style={{
				height: listHeight,
			}}
			className="flex-1"
			fixedHeight
			loading={loading}
			hasMore={hasMore}
			onLoad={async () => {
				const innerList = await runAsync();
				list.current = concat(list.current, innerList || []);
				update();
			}}
		>
			{renderContent?.(list.current)}

			{isEmpty(list.current) && (
				<Empty>
					<Empty.Image />
					<Empty.Description>暂无内容</Empty.Description>
					{hasEmptyCreate && (
						<View className="p-4">
							<Button color="primary" block onClick={onEmptyCreateClick}>
								去新建
							</Button>
						</View>
					)}
				</Empty>
			)}

			<List.Placeholder>
				{loading && <Loading>加载中...</Loading>}
				{!hasMore && "没有更多了"}
			</List.Placeholder>
		</List>
	);

	const createButton = (
		<FixedView position="bottom">
			<View className="p-4 flex justify-end">
				<Button
					shape="round"
					icon={<Plus />}
					color="primary"
					variant="contained"
					onClick={onEmptyCreateClick}
				></Button>
			</View>
			<SafeArea position="bottom" />
		</FixedView>
	);

	return (
		<>
			{renderSearch}

			{ready.current && renderList}

			{hasEmptyCreate && createButton}
		</>
	);
}
