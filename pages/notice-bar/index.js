Page({
  data: {
    noticeText: '这是一条重要的通知，请注意查收！这条通知的内容比较长，会触发滚动播放效果。',
    noticeTextShort: '短文本通知',
    scrollable: true
  },

  onClose() {
    wx.showToast({
      title: '已关闭',
      icon: 'none'
    });
  },

  onClick() {
    wx.showToast({
      title: '点击了通知',
      icon: 'none'
    });
  },

  toggleScroll() {
    this.setData({
      scrollable: !this.data.scrollable
    });
  }
})
