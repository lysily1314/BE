Page({
  data: {
    active1: 0,
    active2: 1,
    active3: 2
  },
  onTabChange1(e) {
    this.setData({ active1: e.detail.index })
    wx.showToast({ title: '切换到：' + e.detail.index, icon: 'none' })
  },
  onTabChange2(e) {
    this.setData({ active2: e.detail.index })
    wx.showToast({ title: '切换到：' + e.detail.index, icon: 'none' })
  },
  onTabChange3(e) {
    this.setData({ active3: e.detail.index })
    wx.showToast({ title: '切换到：' + e.detail.index, icon: 'none' })
  }
})
