Page({
  data: {
    barData: [
      { label: '1月', value: 120 },
      { label: '2月', value: 200 },
      { label: '3月', value: 150 },
      { label: '4月', value: 80 },
      { label: '5月', value: 70 },
      { label: '6月', value: 110 },
      { label: '7月', value: 130 }
    ],
    lineData: [
      { label: '周一', value: 30 },
      { label: '周二', value: 50 },
      { label: '周三', value: 45 },
      { label: '周四', value: 70 },
      { label: '周五', value: 60 },
      { label: '周六', value: 90 },
      { label: '周日', value: 80 }
    ],
    pieData: [
      { label: '服装', value: 300 },
      { label: '食品', value: 200 },
      { label: '电子产品', value: 150 },
      { label: '家居', value: 100 },
      { label: '其他', value: 50 }
    ],
    doughnutData: [
      { label: '已完成', value: 60 },
      { label: '进行中', value: 30 },
      { label: '未开始', value: 10 }
    ],
    multiBarData: [
      { label: 'Q1', value: 120 },
      { label: 'Q2', value: 200 },
      { label: 'Q3', value: 150 },
      { label: 'Q4', value: 180 }
    ],
    smoothLineData: [
      { label: '00:00', value: 20 },
      { label: '04:00', value: 35 },
      { label: '08:00', value: 60 },
      { label: '12:00', value: 80 },
      { label: '16:00', value: 55 },
      { label: '20:00', value: 40 },
      { label: '24:00', value: 30 }
    ],
    areaLineData: [
      { label: '1月', value: 30 },
      { label: '2月', value: 50 },
      { label: '3月', value: 45 },
      { label: '4月', value: 70 },
      { label: '5月', value: 60 },
      { label: '6月', value: 90 }
    ],
    customColors: ['#FF4400', '#07c160', '#1989fa', '#ff976a', '#ee0a24', '#7232dd', '#ffbe0b', '#6467ef'],
    showLegend: true,
    showTooltip: true,
    animation: true,
    showValue: false
  },
  toggleLegend() {
    this.setData({
      showLegend: !this.data.showLegend
    })
  },
  toggleTooltip() {
    this.setData({
      showTooltip: !this.data.showTooltip
    })
  },
  toggleAnimation() {
    this.setData({
      animation: !this.data.animation
    })
  },
  toggleValue() {
    this.setData({
      showValue: !this.data.showValue
    })
  },
  refreshChart() {
    const chart = this.selectComponent('#barChart')
    if (chart) {
      chart.refresh()
      wx.showToast({
        title: '图表已刷新',
        icon: 'none'
      })
    }
  },
  exportChart() {
    const chart = this.selectComponent('#barChart')
    if (chart) {
      chart.exportImage().then(res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            wx.showToast({
              title: '图片已保存',
              icon: 'success'
            })
          },
          fail: () => {
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            })
          }
        })
      }).catch(err => {
        wx.showToast({
          title: '导出失败',
          icon: 'none'
        })
      })
    }
  }
})
