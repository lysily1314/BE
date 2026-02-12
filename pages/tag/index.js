Page({
  data: {
    tagTypes: [
      { name: 'primary', desc: '主要' },
      { name: 'success', desc: '成功' },
      { name: 'warning', desc: '警告' },
      { name: 'danger', desc: '危险' }
    ],
    tagSizes: [
      { name: 'small', desc: '小' },
      { name: 'medium', desc: '中' },
      { name: 'large', desc: '大' }
    ]
  },

  onClose() {
    wx.showToast({
      title: '标签已关闭',
      icon: 'none'
    })
  }
})
