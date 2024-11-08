import { manageUserList } from "@/api";
import Feeds from "@/components/Feeds";
import { routePush } from "@/shared/route";
import { Avatar, Button, Cell, SwipeCell } from "@taroify/core";
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
								<SwipeCell key={user.id}>
									<Cell
										title={user.name}
										brief={user.username}
										icon={
											<Avatar className="mr-2">
												{user.name.at(0)?.toUpperCase()}
											</Avatar>
										}
										align="center"
										isLink
										onClick={() =>
											routePush("/user/pages/detail", {
												userId: user.id,
											})
										}
									>
										{user.group.name}
									</Cell>
									<SwipeCell.Actions side="right">
										<Button
											variant="contained"
											shape="square"
											color="danger"
											className="h-full"
										>
											删除
										</Button>
									</SwipeCell.Actions>
								</SwipeCell>
							);
						})}
					</Cell.Group>
				);
			}}
		/>
	);
}
