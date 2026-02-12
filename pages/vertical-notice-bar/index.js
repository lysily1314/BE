Page({
  data: {
    basicNotices: [
      { text: '欢迎使用ec-ui组件库，这是一个功能完整的纵向通告栏组件' },
      { text: '支持自定义滚动速度、动画效果等多种配置' },
      { text: '点击通告可以跳转到指定页面' }
    ],
    taggedNotices: [
      { text: '新功能上线：支持暗黑模式', tag: '新功能', tagColor: '#FF4400' },
      { text: '系统维护通知：今晚22:00-23:00', tag: '系统', tagColor: '#07c160' },
      { text: '限时优惠：全场商品8折起', tag: '促销', tagColor: '#ff976a' }
    ],
    linkNotices: [
      { text: '点击查看最新活动详情', url: '/pages/index/index' },
      { text: '点击进入个人中心', url: '/pages/profile/index' },
      { text: '点击查看商品列表', url: '/pages/card/index' }
    ],
    typeNotices: [
      { text: '这是一条默认类型的通告' },
      { text: '这是一条主要类型的通告' },
      { text: '这是一条成功类型的通告' },
      { text: '这是一条警告类型的通告' },
      { text: '这是一条危险类型的通告' }
    ],
    customNotices: [
      { text: '自定义样式的通告栏1' },
      { text: '自定义样式的通告栏2' },
      { text: '自定义样式的通告栏3' }
    ],
    speedNotices: [
      { text: '快速滚动的通告内容' },
      { text: '快速滚动的通告内容' },
      { text: '快速滚动的通告内容' }
    ],
    singleNotice: [
      { text: '单条通告内容，不会自动滚动' }
    ],
    closeableNotices: [
      { text: '这是一条可以关闭的通告' },
      { text: '点击右侧关闭按钮可以隐藏' },
      { text: '关闭后会触发close事件' }
    ],
    pauseNotices: [
      { text: '触摸时暂停滚动' },
      { text: '松开后继续滚动' },
      { text: '提供更好的用户体验' }
    ],
    currentIndex: 0,
    currentItem: null
  },
  onItemClick(e) {
    const { index, item } = e.detail
    console.log('点击通告:', index, item)
    wx.showToast({
      title: `点击了第${index + 1}条通告`,
      icon: 'none'
    })
  },
  onIconClick() {
    console.log('点击了图标')
    wx.showToast({
      title: '点击了图标',
      icon: 'none'
    })
  },
  onClose(e) {
    console.log('关闭通告栏')
    wx.showToast({
      title: '通告栏已关闭',
      icon: 'none'
    })
  },
  onScrollStart() {
    console.log('滚动开始')
  },
  onScrollEnd() {
    console.log('滚动结束')
  },
  pauseScroll() {
    const noticeBar = this.selectComponent('#pauseNoticeBar')
    if (noticeBar) {
      noticeBar.pause()
      wx.showToast({
        title: '已暂停滚动',
        icon: 'none'
      })
    }
  },
  resumeScroll() {
    const noticeBar = this.selectComponent('#pauseNoticeBar')
    if (noticeBar) {
      noticeBar.resume()
      wx.showToast({
        title: '已恢复滚动',
        icon: 'none'
      })
    }
  },
  nextNotice() {
    const noticeBar = this.selectComponent('#pauseNoticeBar')
    if (noticeBar) {
      noticeBar.next()
    }
  },
  prevNotice() {
    const noticeBar = this.selectComponent('#pauseNoticeBar')
    if (noticeBar) {
      noticeBar.prev()
    }
  },
  goToIndex() {
    const noticeBar = this.selectComponent('#pauseNoticeBar')
    if (noticeBar) {
      noticeBar.goToIndex(0)
    }
  },
  getCurrentInfo() {
    const noticeBar = this.selectComponent('#pauseNoticeBar')
    if (noticeBar) {
      const index = noticeBar.getCurrentIndex()
      const item = noticeBar.getCurrentItem()
      this.setData({
        currentIndex: index,
        currentItem: item
      })
      wx.showToast({
        title: `当前第${index + 1}条`,
        icon: 'none'
      })
    }
  }
})
