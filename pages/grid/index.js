Page({
  data: {
    gridData1: [
      { icon: 'home', title: '首页' },
      { icon: 'category', title: '分类' },
      { icon: 'cart', title: '购物车' },
      { icon: 'user', title: '我的' },
      { icon: 'search', title: '搜索' },
      { icon: 'heart', title: '收藏' }
    ],
    gridData2: [
      { icon: 'phone', title: '手机', desc: '数码电器' },
      { icon: 'clothes', title: '服饰', desc: '潮流穿搭' },
      { icon: 'food', title: '美食', desc: '生鲜果蔬' },
      { icon: 'home', title: '家居', desc: '品质生活' },
      { icon: 'car', title: '出行', desc: '交通出行' },
      { icon: 'book', title: '图书', desc: '知识学习' },
      { icon: 'game', title: '娱乐', desc: '休闲娱乐' },
      { icon: 'beauty', title: '美妆', desc: '美丽人生' },
      { icon: 'health', title: '健康', desc: '医疗保健' }
    ]
  },
  onItemClick1(e) {
    const index = e.currentTarget.dataset.index
    wx.showToast({ title: '点击了：' + this.data.gridData1[index].title, icon: 'none' })
  },
  onItemClick2(e) {
    const index = e.currentTarget.dataset.index
    wx.showToast({ title: '点击了：' + this.data.gridData2[index].title, icon: 'none' })
  }
})
