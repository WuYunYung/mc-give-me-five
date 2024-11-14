import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { userProfileRead, UserProfileUpdate } from "@/api";
import { isNil, merge } from "lodash-es";
import {
	getStorageSync,
	removeStorageSync,
	setStorageSync,
	showLoading,
	hideLoading,
} from "@tarojs/taro";
import { wrapPromiseWith } from "./utils";

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
	loadUser: () => Promise<[Error, null] | [null, UserProfileUpdate]>;
};

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
				/** 加载用户信息 */
				loadUser: async () => {
					const { user: storeUser } = get();

					const shouldShowLoading = isNil(storeUser);

					shouldShowLoading && showLoading();
					const result = await wrapPromiseWith(
						userProfileRead as unknown as () => Promise<UserProfileUpdate>,
					)();

					const [, user] = result;

					if (user) {
						set((state) => {
							state.user = user;
						});
					}

					shouldShowLoading && hideLoading();

					return result;
				},
			};
		}),
		{
			name: "store",
			storage: createJSONStorage(() => ({
				getItem(name) {
					const result = getStorageSync(name);

					return result;
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
