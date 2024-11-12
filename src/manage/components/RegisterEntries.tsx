import { routePush } from "@/shared/route";
import { FloatingBubble } from "@taroify/core";
import { AppsOutlined } from "@taroify/icons";
import { showActionSheet } from "@tarojs/taro";

/** 注册信息入口（业务组件） */
export default function RegisterEntries(props: {
	groupId?: string | number;
	groupName?: string;
	onRefresh?: () => void;
	disableRegisterInfoEntry?: boolean;
}) {
	const { groupId, groupName, onRefresh, disableRegisterInfoEntry } = props;

	return (
		<FloatingBubble
			axis="xy"
			magnetic="x"
			icon={<AppsOutlined />}
			onClick={() => {
				const menus = ["新建注册信息", "导入注册信息"];

				if (!disableRegisterInfoEntry) {
					menus.push("查看注册信息");
				}

				showActionSheet({
					itemList: menus,
					success(result) {
						switch (result.tapIndex) {
							case 0:
								return routePush(
									"/manage/pages/register/form",
									{
										groupId,
										groupName,
									},
									() => onRefresh?.(),
								);
							case 1:
								return routePush(
									"/feature/pages/group-import-users",
									{
										groupId,
										groupName,
									},
									() => onRefresh?.(),
								);
							case 2:
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
