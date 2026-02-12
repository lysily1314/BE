Page({
  data: {
    // 右侧操作按钮配置
    rightActions: [
      {
        text: '收藏',
        color: '#3296fa',
        width: 80
      },
      {
        text: '删除',
        color: '#ee0a24',
        width: 80
      }
    ],
    // 左侧操作按钮配置
    leftActions: [
      {
        text: '回复',
        color: '#07c160',
        width: 80
      }
    ],
    // 复杂操作按钮配置
    complexActions: [
      {
        text: '取消',
        color: '#c8c9cc',
        width: 80
      },
      {
        text: '确认',
        color: '#ff976a',
        width: 80
      },
      {
        text: '删除',
        color: '#ee0a24',
        width: 80
      }
    ]
  },

  // 操作按钮点击事件
  onAction(e) {
    const { index, name, action } = e.detail;
    wx.showToast({
      title: `点击了: ${action.text}`,
      icon: 'none'
    });
  }
})
