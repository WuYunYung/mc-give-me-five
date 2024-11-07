import type { UserConfigExport } from "@tarojs/cli";

export default {
	mini: {
		webpackChain(chain) {
			chain.merge({
				plugin: {
					"terser-webpack-plugin": {
						plugin: require("terser-webpack-plugin"),
						args: [
							{
								terserOptions: {
									compress: true, // 默认使用 Terser 压缩
									keep_classnames: true, // 不改变类名
									keep_fnames: true, // 不改变函数名
								},
							},
						],
					},
				},
			});
		},
	},
	h5: {},
} satisfies UserConfigExport<"vite">;
