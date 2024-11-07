import { useRequest } from "ahooks";
import { useMemo } from "react";
import { activityCountByType } from "@/api";

export type Summary = Record<number, number>;

export type SummaryResult = {
	attend: Summary;
	signed: Summary;
	total: Summary;
};

export default function useActivityCountByType() {
	const { data, loading } = useRequest(() => activityCountByType(), {
		cacheKey: "[GET]/activity/count_by_type/",
	});

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

	return {
		loading,
		data: innerData,
	};
}
