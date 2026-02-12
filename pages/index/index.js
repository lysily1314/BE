Page({
  data: {
    version: '1.0.0',
    basicComponents: [
      { name: 'Button', desc: '按钮', path: '/pages/button/index' },
      { name: 'Cell', desc: '单元格', path: '/pages/cell/index' },
      { name: 'Icon', desc: '图标', path: '/pages/icon/index' },
      { name: 'Toast', desc: '轻提示', path: '/pages/toast/index' },
      { name: 'Dialog', desc: '对话框', path: '/pages/dialog/index' },
      { name: 'Tag', desc: '标签', path: '/pages/tag/index' },
      { name: 'GridLayout', desc: '栅格布局', path: '/pages/grid-layout/index' },
      { name: 'Divider', desc: '分割线', path: '/pages/divider/index' }
    ],
    bizComponents: [
      { name: 'Card', desc: '商品卡片', path: '/pages/card/index' },
      { name: 'SearchBar', desc: '搜索栏', path: '/pages/search-bar/index' },
      { name: 'AddressPicker', desc: '地址选择器', path: '/pages/address-picker/index' },
      { name: 'DatePicker', desc: '日期选择器', path: '/pages/date-picker/index' }
    ],
    formComponents: [
      { name: 'Input', desc: '输入框', path: '/pages/input/index' },
      { name: 'Textarea', desc: '文本域', path: '/pages/textarea/index' },
      { name: 'Switch', desc: '开关', path: '/pages/switch/index' },
      { name: 'Radio', desc: '单选/复选', path: '/pages/radio/index' },
      { name: 'Stepper', desc: '步进器', path: '/pages/stepper/index' },
      { name: 'Rate', desc: '评分', path: '/pages/rate/index' },
      { name: 'Keyboard', desc: '数字键盘', path: '/pages/keyboard/index' }
    ],
    dataComponents: [
      { name: 'List', desc: '列表', path: '/pages/list/index' },
      { name: 'Tabs', desc: '标签页', path: '/pages/tabs/index' },
      { name: 'Alert', desc: '警告提示', path: '/pages/alert/index' },
      { name: 'ActionSheet', desc: '动作面板', path: '/pages/action-sheet/index' },
      { name: 'Steps', desc: '步骤条', path: '/pages/steps/index' },
      { name: 'Grid', desc: '九宫格', path: '/pages/grid/index' },
      { name: 'TabBar', desc: '标签栏', path: '/pages/tab-bar/index' },
      { name: 'Panel', desc: '面板', path: '/pages/panel/index' },
      { name: 'ContentCard', desc: '内容卡片', path: '/pages/content-card/index' },
      { name: 'Index', desc: '索引选择器', path: '/pages/index-demo/index' },
      { name: 'Drawer', desc: '抽屉', path: '/pages/drawer/index' },
      { name: 'NoticeBar', desc: '通告栏', path: '/pages/notice-bar/index' },
      { name: 'ColorPanel', desc: '颜色面板', path: '/pages/color-panel/index' },
      { name: 'Pagination', desc: '分页', path: '/pages/pagination/index' },
      { name: 'Swipeout', desc: '滑动菜单', path: '/pages/swipeout/index' },
      { name: 'Sticky', desc: '吸顶容器', path: '/pages/sticky/index' },
      { name: 'SwiperCard', desc: '图片卡片轮播', path: '/pages/swiper-card/index' },
      { name: 'RollNew', desc: '滚动容器', path: '/pages/roll-new/index' },
      { name: 'VerticalNoticeBar', desc: '纵向通告栏', path: '/pages/vertical-notice-bar/index' },
      { name: 'Chart', desc: '图表', path: '/pages/chart/index' },
      { name: 'Table', desc: '表格', path: '/pages/table/index' }
    ],
    templatePages: [
      { name: 'Login', desc: '登录页模板', path: '/pages/login/index' },
      { name: 'Profile', desc: '个人中心页', path: '/pages/profile/index' }
    ],
  },
  onNavigate(e) {
    console.log(e)
    const { path } = e.currentTarget.dataset
    wx.navigateTo({ url: path })
  }
})
