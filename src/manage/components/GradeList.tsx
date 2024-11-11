import { manageGradeList } from "@/api";
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
						const { results = [] } = await manageGradeList(params);
						return concat(results);
					}}
					renderContent={(list) => (
						<Cell.Group>
							{list.map((grade) => (
								<Cell
									key={grade.id}
									title={<View className="text-left">{grade.name}</View>}
									clickable
									onClick={(e) => {
										e.stopPropagation();
										onChange?.(grade);
										onBlur?.(grade);
										toggleOpen(false);
									}}
								>
									{grade.groups?.length || 0}
								</Cell>
							))}
						</Cell.Group>
					)}
				></Feeds>
			</>
		);
	},
});
