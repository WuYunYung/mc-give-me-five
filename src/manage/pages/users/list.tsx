import { manageUserList } from "@/api";
import Feeds from "@/components/Feeds";
import { maskPhoneNumber } from "@/shared/utils";
import { Avatar, Cell } from "@taroify/core";
import { useRouter, setNavigationBarTitle } from "@tarojs/taro";
import { useMount } from "ahooks";

export default function () {
	const { params } = useRouter<{
		groupId?: string;
		gradeId?: string;
		groupName?: string;
	}>();

	const { groupId, gradeId, groupName } = params;

	useMount(() => {
		groupName &&
			setNavigationBarTitle({ title: decodeURIComponent(groupName) });
	});

	return (
		<Feeds
			service={async (params) => {
				const requestParams: Exclude<
					Parameters<typeof manageUserList>[0],
					undefined
				> = { ...params, isAdmin: "false" };

				if (gradeId) {
					requestParams.group__grade_id = gradeId;
				}

				if (groupId) {
					requestParams.group_id = groupId;
				}

				const { results = [] } = await manageUserList(requestParams);

				return results;
			}}
			renderContent={(list) => {
				return (
					<Cell.Group>
						{list.map((user) => {
							return (
								<Cell
									key={user.id}
									title={user.name}
									brief={user.username}
									icon={
										<Avatar className="mr-2">
											{user.name.at(0)?.toUpperCase()}
										</Avatar>
									}
									align="center"
								>
									{maskPhoneNumber(user.phone)}
								</Cell>
							);
						})}
					</Cell.Group>
				);
			}}
		/>
	);
}
