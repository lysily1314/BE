Page({
  data: {
    loading: false
  },
  onTap() {
    wx.showToast({ title: '点击了按钮', icon: 'none' })
  },
  onLoadingTap() {
    this.setData({ loading: true })
    setTimeout(() => {
      this.setData({ loading: false })
    }, 2000)
  }
})
