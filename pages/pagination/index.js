Page({
  data: {
    // 基础分页数据
    basicPagination: {
      current: 1,
      total: 100,
      pageSize: 10
    },
    // 带总数分页数据
    totalPagination: {
      current: 1,
      total: 123,
      pageSize: 10
    },
    // 带条数选择分页数据
    selectorPagination: {
      current: 1,
      total: 200,
      pageSize: 10
    },
    // 带跳转分页数据
    jumpPagination: {
      current: 1,
      total: 50,
      pageSize: 5
    }
  },

  // 页码变化事件
  onPageChange(e) {
    const { current } = e.detail;
    const type = e.target.dataset.type;
    
    this.setData({
      [`${type}.current`]: current
    });
    
    wx.showToast({
      title: `切换到第 ${current} 页`,
      icon: 'none'
    });
  },

  // 每页条数变化事件
  onPageSizeChange(e) {
    const { pageSize } = e.detail;
    const type = e.target.dataset.type;
    
    this.setData({
      [`${type}.pageSize`]: pageSize,
      [`${type}.current`]: 1  // 重置到第一页
    });
    
    wx.showToast({
      title: `每页 ${pageSize} 条`,
      icon: 'none'
    });
  }
})
