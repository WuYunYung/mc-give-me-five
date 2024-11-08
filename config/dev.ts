import type { UserConfigExport } from "@tarojs/cli";
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from "weapp-tailwindcss/vite";
import tailwindcss from "tailwindcss";

const vitePlugins = [
	{
		// 通过 vite 插件加载 postcss,
		name: "postcss-config-loader-plugin",
		config(config) {
			// 加载 tailwindcss
			if (typeof config.css?.postcss === "object") {
				config.css?.postcss.plugins?.unshift(tailwindcss());
			}
		},
	},
	uvtw({
		// rem转rpx
		rem2rpx: true,
		// 除了小程序这些，其他平台都 disable
		disabled:
			process.env.TARO_ENV === "h5" ||
			process.env.TARO_ENV === "harmony" ||
			process.env.TARO_ENV === "rn",
	}),
] as Plugin[];

export default {
	compiler: {
		type: "vite",
		vitePlugins,
	},
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
