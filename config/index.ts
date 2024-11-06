import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import * as path from "node:path";

import devConfig from "./dev";
import prodConfig from "./prod";

import { UnifiedViteWeappTailwindcssPlugin as uvtw } from "weapp-tailwindcss/vite";
import tailwindcss from "tailwindcss";
import { analyzer } from "vite-bundle-analyzer";

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

if (process.env.ANALYZE === "1") {
	vitePlugins.push(analyzer() as Plugin);
}

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<"vite">(async (merge) => {
	const baseConfig: UserConfigExport<"vite"> = {
		projectName: "mc-give-me-five",
		date: "2024-11-1",
		designWidth: 750,
		deviceRatio: {
			640: 2.34 / 2,
			750: 1,
			375: 2,
			828: 1.81 / 2,
		},
		sourceRoot: "src",
		outputRoot: "dist",
		defineConstants: {},
		copy: {
			patterns: [],
			options: {},
		},
		framework: "react",
		compiler: {
			type: "vite",
			prebundle: {
				enable: true,
				swc: {},
			},
			vitePlugins, // 从 vite 引入 type, 为了智能提示
		},
		alias: {
			"@/api": path.resolve(__dirname, "../assets/api"),
			"@/shared": path.resolve(__dirname, "../src/shared"),
			"@/components": path.resolve(__dirname, "../src/components"),
		},
		mini: {
			postcss: {
				pxtransform: {
					enable: true,
					config: {},
				},
				cssModules: {
					enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
					config: {
						namingPattern: "module", // 转换模式，取值为 global/module
						generateScopedName: "[name]__[local]___[hash:base64:5]",
					},
				},
			},
			optimizeMainPackage: {
				enable: true,
			},
		},
		h5: {
			publicPath: "/",
			staticDirectory: "static",

			miniCssExtractPluginOption: {
				ignoreOrder: true,
				filename: "css/[name].[hash].css",
				chunkFilename: "css/[name].[chunkhash].css",
			},
			postcss: {
				autoprefixer: {
					enable: true,
					config: {},
				},
				cssModules: {
					enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
					config: {
						namingPattern: "module", // 转换模式，取值为 global/module
						generateScopedName: "[name]__[local]___[hash:base64:5]",
					},
				},
			},
		},
		rn: {
			appName: "taroDemo",
			postcss: {
				cssModules: {
					enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
				},
			},
		},
	};
	if (process.env.NODE_ENV === "development") {
		// 本地开发构建配置（不混淆压缩）
		return merge({}, baseConfig, devConfig);
	}
	// 生产构建配置（默认开启压缩混淆等）
	return merge({}, baseConfig, prodConfig);
});
