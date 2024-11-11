import { useMemoizedFn, useRequest, clearCache } from "ahooks";
import { useMemo } from "react";
import { activityCountByType } from "@/api";
import dayjs from "dayjs";
import { DateFormat } from "@/shared/constants";
import classNames from "classnames";

export type Summary = Record<number, number>;

export type SummaryResult = {
	attend: Summary;
	signed: Summary;
	total: Summary;
};

export default function useActivityCountByType(params?: {
	queryByNow?: boolean;
}) {
	const { queryByNow } = params || {};

	const cacheKey = classNames("[GET]/activity/count_by_type/", {
		queryByNow,
	});

	const { data, loading, runAsync } = useRequest(
		() =>
			activityCountByType({
				start_time: queryByNow ? dayjs().format(DateFormat.Remote) : undefined,
			}),
		{
			cacheKey,
			staleTime: 60 * 1000 * 5,
		},
	);

	const innerData = useMemo(() => {
		const { attend, signed, total } = (data as unknown as SummaryResult) || {};

		const types = total ? Object.keys(total).sort() : [];

		return types.map((type) => ({
			type,
			attend: attend[type],
			signed: signed[type],
			total: total[type],
		}));
	}, [data]);

	const forceRefreshAsync = useMemoizedFn(() => {
		clearCache(cacheKey);
		return runAsync();
	});

	return {
		loading,
		data: innerData,
		forceRefreshAsync,
	};
}
