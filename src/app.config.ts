export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/history/index',
    'pages/user/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#8a8a8a',
    selectedColor: '#930a41',
    backgroundColor: '#fafafa',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './static/tabBar/home_default.png',
        selectedIconPath: './static/tabBar/home.png',
        text: '首页'
      },
      {
        pagePath: 'pages/history/index',
        iconPath: './static/tabBar/history_default.png',
        selectedIconPath: './static/tabBar/history.png',
        text: '识字'
      },
      {
        pagePath: 'pages/user/index',
        iconPath: './static/tabBar/user_default.png',
        selectedIconPath: './static/tabBar/user.png',
        text: '书房'
      },
    ]
  },
})
