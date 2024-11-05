import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { UserRegister } from "@/api";
import { merge, } from "lodash-es";
import {
	getStorageSync,
	removeStorageSync,
	setStorageSync,
} from "@tarojs/taro";

type Store = {
	/**
	 * 是否访客
	 *
	 * @default true
	 */
	visitor: boolean;
	toggleVisitor: (value: boolean) => void;

	user: UserRegister | null;
	setupUser: (user: Partial<UserRegister>) => void;
};

// TODO: 持久化初始化数据
const useStore = create<Store>()(
	persist(
		immer((set, get) => {
			return {
				visitor: true,
				toggleVisitor: (value) => {
					set((state) => {
						state.visitor = value;
					});
				},

				user: null,
				setupUser: (user) => {
					set((state) => {
						state.user = merge(get().user, user);
						state.visitor = false;
					});
				},
			};
		}),
		{
			name: "store",
			storage: createJSONStorage(() => ({
				getItem(name) {
					const result = getStorageSync(name);

					return JSON.stringify(result);
				},
				setItem(name, value) {
					setStorageSync(name, value);
				},
				removeItem(name) {
					removeStorageSync(name);
				},
			})),
			version: 0,
		},
	),
);

export default useStore;
