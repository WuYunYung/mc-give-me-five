import {
	Empty,
	FloatingBubble,
	List,
	Loading,
	PullRefresh,
	SafeArea,
	Search,
} from "@taroify/core";
import { Button } from "@taroify/core";
import { Plus } from "@taroify/icons";
import { ITouchEvent, View } from "@tarojs/components";
import {
	createSelectorQuery,
	useDidHide,
	useDidShow,
	getWindowInfo,
} from "@tarojs/taro";
import { useCreation, useMemoizedFn, useRequest, useUpdate } from "ahooks";
import { concat, isEmpty, isFunction, isNil, merge, uniqueId } from "lodash-es";
import {
	forwardRef,
	ReactElement,
	ReactNode,
	Ref,
	RefAttributes,
	useImperativeHandle,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react";
import { Draft, produce } from "immer";

type Mutate<T> = (updater: T[] | ((prevList: Draft<T>[]) => void)) => void;

export type Option<T> = {
	mutate: Mutate<T>;
	refresh: () => void;
};

export type FeedsProps<T> = {
	service?: (params: {
		search?: string;
		limit?: number;
		offset: number;
	}) => Promise<T[]>;

	renderContent?: (list: T[], options: Option<T>) => ReactNode;

	enableCreate?: boolean;
	onCreateClick?: (event: ITouchEvent, options: Option<T>) => void;

	height?: number;

	disabledSearch?: boolean;

	disableSaveArea?: boolean;

	/** 禁用返回当前页面时自动刷新 */
	disabledAutoRefresh?: boolean;

	/** 禁用默认的新建气泡 */
	disabledCreateBubble?: boolean;
};

const LIMIT = 10;

/**
 * 列表组件
 *
 * 集成搜索、上拉加载、空状态
 * @TODO 下拉更新
 */
function Feeds<T>(props: FeedsProps<T>, ref: Ref<Option<T>>): ReactElement {
	const {
		service,
		renderContent,
		enableCreate,
		onCreateClick: onEmptyCreateClick,
		height: propHeight,
		disabledSearch,
		disableSaveArea,
		disabledAutoRefresh,
		disabledCreateBubble,
	} = props;

	const list = useRef<T[]>([]);
	const search = useRef<string>("");
	const ready = useRef(false);
	const pullDownRefreshLoading = useRef(false);
	const update = useUpdate();

	const { loading, runAsync, data } = useRequest(
		async (params?: Parameters<Exclude<typeof service, undefined>>[0]) => {
			const innerParams = {
				limit: LIMIT,
				offset: list.current.length,
			} as Exclude<typeof params, undefined>;

			if (search.current) {
				innerParams.search = search.current;
			}
			return service?.(merge(innerParams, params));
		},
		{
			manual: true,
		},
	);

	const hasMore = !data || data?.length === LIMIT;

	const searchRef = useRef();

	const handleClear = useMemoizedFn(async () => {
		const prevContent = search.current;

		search.current = "";
		if (!prevContent) return;
		const innerList = await runAsync({
			offset: 0,
		});
		list.current = innerList || [];
		update();
	});

	const searchBarId = useCreation(() => uniqueId("feads-search-bar-"), []);
	const searchBarHeight = useRef(0);
	const windowHeight = useMemo(() => {
		const { windowHeight } = getWindowInfo();

		return windowHeight;
	}, []);

	const listHeight = propHeight ?? windowHeight - searchBarHeight.current;

	useLayoutEffect(() => {
		if (ready.current || !isNil(propHeight) || disabledSearch) {
			ready.current = true;
			update();
			return;
		}

		createSelectorQuery()
			.select(`#${searchBarId}`)
			.boundingClientRect((result) => {
				const rect = Array.isArray(result) ? result[0] : result;
				searchBarHeight.current = rect.height;
				ready.current = true;
				update();
			})
			.exec();
	}, [searchBarId, update, disabledSearch, propHeight]);

	const shouldDidShowAutoRefresh = useRef(false);

	const refreshList = useMemoizedFn(async () => {
		const innerList = await runAsync({
			offset: 0,
		});
		list.current = innerList || [];
		update();
	});

	useDidShow(() => {
		if (!shouldDidShowAutoRefresh.current) return;

		!disabledAutoRefresh && refreshList();
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
					const innerList = await runAsync({ offset: 0 });
					list.current = innerList || [];
					update();
				}}
				onClear={handleClear}
			/>
		</View>
	);

	const mutate = useMemoizedFn<Mutate<T>>((updater) => {
		let result: T[];

		if (isFunction(updater)) {
			result = produce(list.current, (state) => {
				updater(state);
			});
		} else {
			result = updater;
		}

		list.current = result;
		update();
		return;
	});

	const commonOption: Option<T> = useCreation(
		() => ({ mutate, refresh: refreshList }),
		[],
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
			{renderContent?.(list.current, commonOption)}

			{isEmpty(list.current) && (
				<Empty>
					<Empty.Image />
					<Empty.Description>暂无内容</Empty.Description>
					{enableCreate && (
						<View className="p-4">
							<Button
								color="primary"
								block
								onClick={(e) => onEmptyCreateClick?.(e, commonOption)}
							>
								去新建
							</Button>
						</View>
					)}
				</Empty>
			)}

			<List.Placeholder>
				{!pullDownRefreshLoading.current && loading && (
					<Loading>加载中...</Loading>
				)}
				{!isEmpty(list.current) && !hasMore && "没有更多了"}
			</List.Placeholder>

			{!disableSaveArea && <SafeArea position="bottom" />}
		</List>
	);

	// TODO：性能优化
	// TODO：下拉回调
	const listWithPullRefresh = (
		<PullRefresh
			loading={pullDownRefreshLoading.current && loading}
			onRefresh={async () => {
				pullDownRefreshLoading.current = true;

				await refreshList();

				pullDownRefreshLoading.current = false;
			}}
		>
			{renderList}
		</PullRefresh>
	);

	const createButton = (
		<FloatingBubble
			icon={<Plus />}
			onClick={(e) => onEmptyCreateClick?.(e, commonOption)}
		></FloatingBubble>
	);

	useImperativeHandle(ref, () => commonOption);

	return (
		<>
			{!disabledSearch && renderSearch}

			{ready.current && listWithPullRefresh}

			{enableCreate && !disabledCreateBubble && createButton}
		</>
	);
}

export default forwardRef(Feeds) as unknown as <T>(
	props: FeedsProps<T> & RefAttributes<Option<T>>,
) => ReactElement;
