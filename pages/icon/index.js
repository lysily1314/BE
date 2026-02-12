Page({
  data: {
    icons: [
      { name: 'arrow-right', label: '右箭头' },
      { name: 'arrow-left', label: '左箭头' },
      { name: 'arrow-up', label: '上箭头' },
      { name: 'arrow-down', label: '下箭头' },
      { name: 'search', label: '搜索' },
      { name: 'close', label: '关闭' },
      { name: 'success', label: '成功' },
      { name: 'plus', label: '加号' },
      { name: 'minus', label: '减号' },
      { name: 'cart', label: '购物车' },
      { name: 'heart', label: '心形' },
      { name: 'star', label: '星星' },
      { name: 'star-fill', label: '星星填充' },
      { name: 'error', label: '错误' },
      { name: 'loading', label: '加载' },
      { name: 'info', label: '信息' },
      { name: 'clear', label: '清除' }
    ]
  },
  onIconTap(e) {
    const { name } = e.currentTarget.dataset
    wx.showToast({ title: name, icon: 'none' })
  }
})
