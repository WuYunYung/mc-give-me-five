import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { userProfileRead, UserProfileUpdate } from "@/api";
import { merge } from "lodash-es";
import {
	getStorageSync,
	removeStorageSync,
	setStorageSync,
	showLoading,
	hideLoading,
} from "@tarojs/taro";

type Store = {
	/**
	 * 是否访客
	 *
	 * @default true
	 */
	visitor: boolean;
	toggleVisitor: (value: boolean) => void;

	user: UserProfileUpdate | null;
	setupUser: (user: Partial<UserProfileUpdate>) => void;
	loadUser: () => Promise<void>;
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
				/**
				 * 加载用户信息
				 *
				 * @TODO 考虑没有注册时的跳转问题
				 */
				loadUser: async () => {
					try {
						showLoading();
						const user = await userProfileRead();

						user &&
							set((state) => {
								state.user = user as unknown as UserProfileUpdate;
							});
					} finally {
						hideLoading();
					}
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
