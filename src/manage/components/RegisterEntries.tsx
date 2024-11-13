import { routePush } from "@/shared/route";
import { wrapPromiseWith } from "@/shared/utils";
import { FloatingBubble } from "@taroify/core";
import { AppsOutlined } from "@taroify/icons";
import { showActionSheet } from "@tarojs/taro";
import { useMemoizedFn } from "ahooks";

/** 注册信息入口（业务组件） */
export default function RegisterEntries(props: {
	groupId?: string | number;
	groupName?: string;
	onRefresh?: () => void;
	disabledRegisterInfoEntry?: boolean;
}) {
	const { groupId, groupName, onRefresh, disabledRegisterInfoEntry } = props;

	const handleClick = useMemoizedFn(async () => {
		const options: {
			name: string;
			path: string;
			query?: Record<string, string>;
			shouldRefresh?: boolean;
			disabled?: boolean;
		}[] = [
			{
				name: "新建注册信息",
				path: "/manage/pages/register/form",
				shouldRefresh: true,
			},
			{
				name: "导入注册信息",
				path: "/feature/pages/group-import-users",
				shouldRefresh: true,
			},
			{
				name: "查看注册信息",
				path: "/manage/pages/register/list",
				disabled: disabledRegisterInfoEntry,
			},
		];

		const validOptions = options.filter(({ disabled }) => !disabled);

		const menus = validOptions.map(({ name }) => name);

		const [error, result] = await wrapPromiseWith(showActionSheet)({
			itemList: menus,
		});

		if (error) return;

		const option = validOptions.at(result.tapIndex);

		if (!option) return;

		routePush(
			option.path,
			{
				groupId,
				groupName,
				...option.query,
			},
			() => {
				if (option.shouldRefresh) {
					onRefresh?.();
				}
			},
		);
	});

	return (
		<FloatingBubble
			axis="xy"
			magnetic="x"
			icon={<AppsOutlined />}
			onClick={handleClick}
		/>
	);
}
