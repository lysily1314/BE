Page({
  data: {
    // 基础色彩
    basicColors: [
      { name: '主色', value: '#FF4400', desc: '品牌主色调' },
      { name: '成功', value: '#07c160', desc: '成功状态色' },
      { name: '警告', value: '#ff976a', desc: '警告状态色' },
      { name: '危险', value: '#ee0a24', desc: '危险状态色' },
      { name: '信息', value: '#3296fa', desc: '信息状态色' }
    ],
    // 中性色彩
    neutralColors: [
      { name: '白色', value: '#ffffff', desc: '纯白' },
      { name: '浅灰', value: '#f7f8fa', desc: '背景色' },
      { name: '边框', value: '#eee', desc: '边框色' },
      { name: '分割线', value: '#f5f5f5', desc: '分割线色' },
      { name: '次要文本', value: '#666', desc: '次要文本色' },
      { name: '正文', value: '#333', desc: '正文文本色' },
      { name: '黑色', value: '#000000', desc: '纯黑' }
    ],
    // 渐变色彩
    gradientColors: [
      { name: '橙红渐变', value: 'linear-gradient(45deg, #FF4400, #FF6B35)', desc: '橙红色渐变' },
      { name: '蓝紫渐变', value: 'linear-gradient(45deg, #3296fa, #6a5af9)', desc: '蓝紫色渐变' },
      { name: '绿蓝渐变', value: 'linear-gradient(45deg, #07c160, #38b48b)', desc: '绿蓝色渐变' }
    ]
  },

  onColorClick(e) {
    const { color } = e.detail;
    wx.setClipboardData({
      data: color.value,
      success: () => {
        wx.showToast({
          title: `已复制: ${color.value}`,
          icon: 'none'
        });
      }
    });
  }
})
