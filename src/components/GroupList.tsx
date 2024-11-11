import { manageGroupList } from "@/api";
import Feeds from "@/components/Feeds";
import withPopup from "@/components/withPopup";
import { Popup, Cell } from "@taroify/core";
import { View } from "@tarojs/components";
import { concat } from "lodash-es";
import { getWindowInfo } from "@tarojs/taro";

export default withPopup({
	renderContent(params) {
		const { onChange, onBlur, toggleOpen } = params;

		const { windowHeight } = getWindowInfo();

		const panelHeight = windowHeight * 0.7;

		return (
			<>
				<View className="h-10">
					<Popup.Close />
				</View>
				<Feeds
					height={panelHeight}
					disabledSearch
					service={async (params) => {
						const { results = [] } = await manageGroupList(params);
						return concat(results);
					}}
					renderContent={(list) => (
						<Cell.Group>
							{list.map((group) => (
								<Cell
									key={group.id}
									title={<View className="text-left">{group.name}</View>}
									clickable
									onClick={(e) => {
										e.stopPropagation();
										onChange?.(group);
										onBlur?.(group);
										toggleOpen(false);
									}}
								>
									{group.grade.name}
								</Cell>
							))}
						</Cell.Group>
					)}
				></Feeds>
			</>
		);
	},
});
