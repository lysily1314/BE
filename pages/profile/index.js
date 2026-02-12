Page({
  data: {
    // 用户信息
    userInfo: {
      avatar: '/static/images/avatar.png',
      nickname: '张三',
      vipLevel: 'VIP1',
      points: 1280,
      couponCount: 3
    },
    
    // 订单状态统计
    orderStats: {
      unpaid: 2,
      shipped: 1,
      received: 0,
      refund: 0
    },
    
    // 快捷功能
    quickActions: [
      { icon: 'order', title: '全部订单', path: '/pages/order/list' },
      { icon: 'wallet', title: '我的钱包', path: '/pages/wallet/index' },
      { icon: 'coupon', title: '优惠券', path: '/pages/coupon/index' },
      { icon: 'address', title: '收货地址', path: '/pages/address/index' }
    ],
    
    // 我的服务
    services: [
      { icon: 'favorite', title: '我的收藏', path: '/pages/favorite/index' },
      { icon: 'history', title: '浏览历史', path: '/pages/history/index' },
      { icon: 'comment', title: '我的评价', path: '/pages/comment/index' },
      { icon: 'service', title: '客服中心', path: '/pages/service/index' },
      { icon: 'setting', title: '设置', path: '/pages/setting/index' },
      { icon: 'help', title: '帮助中心', path: '/pages/help/index' }
    ],
    
    // 是否已登录
    isLogin: true
  },
  
  // 页面加载
  onLoad() {
    this._loadUserData()
  },
  
  // 下拉刷新
  onPullDownRefresh() {
    this._loadUserData()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  
  // 加载用户数据
  _loadUserData() {
    // 模拟加载用户信息
    // 实际项目中应调用接口获取真实数据
    this.setData({
      'userInfo.nickname': '张三',
      'userInfo.vipLevel': 'VIP1',
      'userInfo.points': 1280,
      'userInfo.couponCount': 3,
      'orderStats.unpaid': 2,
      'orderStats.shipped': 1
    })
  },
  
  // 去登录
  onLogin() {
    wx.navigateTo({ url: '/pages/login/index' })
  },
  
  // 查看用户信息
  onViewProfile() {
    if (!this.data.isLogin) {
      this.onLogin()
      return
    }
    wx.navigateTo({ url: '/pages/profile/index' })
  },
  
  // 查看订单
  onViewOrder(e) {
    if (!this.data.isLogin) {
      this.onLogin()
      return
    }
    
    const { type } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/order/list?type=${type}`
    })
  },
  
  // 快捷功能点击
  onQuickAction(e) {
    if (!this.data.isLogin) {
      this.onLogin()
      return
    }
    
    const { path } = e.currentTarget.dataset
    wx.navigateTo({ url: path })
  },
  
  // 服务项点击
  onService(e) {
    if (!this.data.isLogin) {
      this.onLogin()
      return
    }
    
    const { path } = e.currentTarget.dataset
    wx.navigateTo({ url: path })
  }
})
