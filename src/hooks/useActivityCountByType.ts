import { useMemoizedFn, useRequest, clearCache } from "ahooks";
import { useMemo } from "react";
import { activityCountByType } from "@/api";
import classNames from "classnames";

export type Summary = Record<number, number>;

export type SummaryResult = {
	attend: Summary;
	signed: Summary;
	total: Summary;
	running: Summary;
};

export default function useActivityCountByType(params?: {
	ready?: boolean;
}) {
	const { ready = true } = params || {};

	const cacheKey = classNames("[GET]/activity/count_by_type/");

	const { data, runAsync, ...rest } = useRequest(() => activityCountByType(), {
		ready,
		cacheKey,
		staleTime: 60 * 1000 * 5,
	});

	const innerData = useMemo(() => {
		const { attend, signed, total, running } =
			(data as unknown as SummaryResult) || {};

		const types = total ? Object.keys(total).sort() : [];

		return types.map((type) => ({
			type,
			attend: attend[type],
			signed: signed[type],
			running: running[type],
			total: total[type],
		}));
	}, [data]);

	const forceRefreshAsync = useMemoizedFn(() => {
		clearCache(cacheKey);
		return runAsync();
	});

	return {
		...rest,
		data: innerData,
		forceRefreshAsync,
	};
}
