import { routePush } from "@/shared/route";
import { FloatingBubble } from "@taroify/core";
import { AppsOutlined } from "@taroify/icons";
import { showActionSheet } from "@tarojs/taro";

/** 注册信息入口（业务组件） */
export default function RegisterEntries(props: {
	groupId?: string | number;
	groupName?: string;
	onRefreshImportUsers?: () => void;
	disableRegistInfoEntry?: boolean;
}) {
	const { groupId, groupName, onRefreshImportUsers, disableRegistInfoEntry } =
		props;

	return (
		<FloatingBubble
			axis="xy"
			magnetic="x"
			icon={<AppsOutlined />}
			onClick={() => {
				const menus = ["导入注册信息"];

				if (!disableRegistInfoEntry) {
					menus.push("查看注册信息");
				}

				showActionSheet({
					itemList: menus,
					success(result) {
						switch (result.tapIndex) {
							case 0:
								return routePush(
									"/feature/pages/group-import-users",
									{
										groupId,
										groupName,
									},
									() => onRefreshImportUsers?.(),
								);
							case 1:
								return routePush("/manage/pages/register/list", {
									groupId,
									groupName,
								});
						}
					},
				});
			}}
		/>
	);
}
