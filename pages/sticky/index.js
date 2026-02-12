Page({
  data: {
    activeTab: 0,
    tabs: ['商品', '评价', '详情', '推荐']
  },

  onTabChange(e) {
    const { index } = e.detail;
    this.setData({
      activeTab: index
    });
  }
})
