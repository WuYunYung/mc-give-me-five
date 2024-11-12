import { useDidHide, useDidShow } from "@tarojs/taro";
import { useRef } from "react";

export default function useBackShow(callback: () => void) {
	const shouldTriggerCallback = useRef(false);

	useDidShow(() => {
		if (!shouldTriggerCallback.current) return;
		callback();
	});

	useDidHide(() => {
		shouldTriggerCallback.current = true;
	});
}
