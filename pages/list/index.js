Page({
  data: {
    list1: [
      { id: 1, title: '订单管理', desc: '查看我的订单', icon: 'cart' },
      { id: 2, title: '收货地址', desc: '管理收货地址', icon: 'success' },
      { id: 3, title: '优惠券', desc: '查看可用优惠券', icon: 'star' },
      { id: 4, title: '会员中心', desc: '我的会员权益', icon: 'heart' }
    ],
    list2: [
      { id: 1, title: '关于我们', icon: 'info' },
      { id: 2, title: '帮助中心', icon: 'info' },
      { id: 3, title: '意见反馈', icon: 'info' }
    ]
  },
  onItemTap(e) {
    const { id } = e.currentTarget.dataset
    wx.showToast({ title: '点击了 #' + id, icon: 'none' })
  }
})
