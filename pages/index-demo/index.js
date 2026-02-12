Page({
  data: {
    indexList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  },
  
  onLoad() {
    // 生成示例数据
    const data = {};
    this.data.indexList.forEach(letter => {
      data[letter] = [];
      for (let i = 0; i < 5; i++) {
        data[letter].push(`${letter}${i + 1}`);
      }
    });
    this.setData(data);
  },
  
  onSelect(e) {
    wx.showToast({
      title: `选择了 ${e.detail.index}`,
      icon: 'none'
    });
  }
})
