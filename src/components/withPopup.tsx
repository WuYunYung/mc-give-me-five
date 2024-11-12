import { Popup } from "@taroify/core";
import { PopupProps } from "@taroify/core/popup/popup";
import { View } from "@tarojs/components";
import { FC, PropsWithChildren, useState, ReactNode } from "react";

export type FormControlProps = {
	value?: any;
	onChange?: (value: any) => void;
	onBlur?: (value: any) => void;
};

const withPopup = <Props,>(
	params: Omit<PopupProps, "open" | "onClose"> & {
		renderContent: (
			params: Props &
				FormControlProps & { toggleOpen: (open: boolean) => void },
		) => ReactNode;
	},
) => {
	const { renderContent } = params;

	const component: FC<PropsWithChildren<Props & FormControlProps>> = (
		props,
	) => {
		const { children } = props;

		const [open, setOpen] = useState(false);

		const trigger = (
			<View
				onClick={(e) => {
					e.stopPropagation();
					setOpen(true);
				}}
			>
				{children}
			</View>
		);

		const instance = (
			<Popup
				open={open}
				placement="bottom"
				onClose={(e) => {
					setOpen(e);
				}}
				rounded
			>
				{renderContent({
					...props,
					toggleOpen: setOpen,
				})}
			</Popup>
		);

		return (
			<>
				{trigger}
				{instance}
			</>
		);
	};

	return component;
};

export default withPopup;
