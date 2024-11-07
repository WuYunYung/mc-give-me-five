function getCustomSpacingConfig() {
	const config = {};

	for (let denominator = 2; denominator <= 12; denominator++) {
		for (let molecular = 1; molecular < denominator; molecular++) {
			const key = `${molecular}s${denominator}`;
			const value = `${Number(((molecular / denominator) * 100).toFixed(5))}%`;

			config[key] = value;
		}
	}

	return config;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	// 这里给出了一份 taro 通用示例，具体要根据你自己项目的目录结构进行配置
	// 比如你使用 vue3 项目，你就需要把 vue 这个格式也包括进来
	// 不在 content glob 表达式中包括的文件，在里面编写 tailwindcss class，是不会生成对应的 css 工具类的
	content: ["./public/index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
	// 其他配置项 ...
	corePlugins: {
		// 小程序不需要 preflight，因为这主要是给 h5 的，如果你要同时开发多端，你应该使用 process.env.TARO_ENV 环境变量来控制它
		preflight: process.env.TARO_ENV === "h5",
	},
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#ffe4e8",
					100: "#febcc7",
					200: "#fc91a2",
					300: "#f8657e",
					400: "#f34663",
					500: "#ee2f4a",
					600: "#de2849",
					700: "#c92247",
					800: "#b61945",
					900: "#930a41",
				},
			},
			spacing: getCustomSpacingConfig(),
		},
	},
	important: true,
};
