import { Popup } from "@taroify/core";
import { PopupProps } from "@taroify/core/popup/popup";
import { View } from "@tarojs/components";
import {
	FC,
	PropsWithChildren,
	useState,
	ReactNode,
	isValidElement,
	cloneElement,
} from "react";

export type FormControlProps = {
	value?: any;
	onChange?: (value: any) => void;
	onBlur?: (value: any) => void;
	disabled?: boolean;
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
		const { children, disabled } = props;

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

		if (disabled) {
			return isValidElement(children)
				? cloneElement(children, {
						disabled: true,
					} as any)
				: children;
		}

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
