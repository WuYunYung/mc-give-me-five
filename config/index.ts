import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import * as path from "node:path";

import devConfig from "./dev";
import prodConfig from "./prod";
import dayjs from "dayjs";

const { UnifiedWebpackPluginV5 } = require("weapp-tailwindcss/webpack");

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<"webpack5">(async (merge) => {
	const baseConfig: UserConfigExport<"webpack5"> = {
		projectName: "mc-give-me-five",
		date: dayjs().format("YYYY-MM-DD"),
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
		compiler: "webpack5",
		cache: {
			enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
			buildDependencies: {
				config: [
					path.resolve(__dirname, "./index.ts"),
					path.resolve(__dirname, "./prod.ts"),
					path.resolve(__dirname, "../pnpm-lock.yaml"),
					path.resolve(__dirname, "../babel.config.js"),
					path.resolve(__dirname, "../postcss.config.js"),
					path.resolve(__dirname, "../tailwind.config.js"),
				],
			},
		},
		alias: {
			"@/api": path.resolve(__dirname, "../src/shared/api"),
			"@/shared": path.resolve(__dirname, "../src/shared"),
			"@/components": path.resolve(__dirname, "../src/components"),
			"@/hooks": path.resolve(__dirname, "../src/hooks"),
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
			webpackChain(chain) {
				chain.merge({
					plugin: {
						"unified-webpack-plugin-v5": {
							plugin: UnifiedWebpackPluginV5,
							args: [
								{
									appType: "taro", // 设置应用类型为 Taro
								},
							],
						},
					},
				});
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
