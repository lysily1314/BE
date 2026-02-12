Page({
  data: {
    verticalList: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `列表项 ${i + 1}`,
      desc: `这是第 ${i + 1} 项的描述信息`
    })),
    horizontalList: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `卡片 ${i + 1}`
    })),
    scrollPosition: {
      scrollTop: 0,
      scrollLeft: 0
    },
    scrollInfo: '',
    upperTriggered: false,
    lowerTriggered: false,
    scrollIntoView: '',
    customHeight: 400
  },
  onScroll(e) {
    const { scrollTop, scrollLeft, scrollHeight, scrollWidth } = e.detail
    this.setData({
      scrollPosition: { scrollTop, scrollLeft },
      scrollInfo: `滚动位置: 顶部${scrollTop}rpx, 左侧${scrollLeft}rpx\n总高度: ${scrollHeight}rpx, 总宽度: ${scrollWidth}rpx`
    })
  },
  onScrollStart(e) {
    console.log('滚动开始', e.detail)
  },
  onScrollEnd(e) {
    console.log('滚动结束', e.detail)
  },
  onScrollToUpper(e) {
    this.setData({ upperTriggered: true })
    wx.showToast({ title: '已滚动到顶部', icon: 'none' })
    setTimeout(() => {
      this.setData({ upperTriggered: false })
    }, 2000)
  },
  onScrollToLower(e) {
    this.setData({ lowerTriggered: true })
    wx.showToast({ title: '已滚动到底部', icon: 'none' })
    setTimeout(() => {
      this.setData({ lowerTriggered: false })
    }, 2000)
  },
  scrollToTop() {
    const rollNew = this.selectComponent('#verticalRollNew')
    if (rollNew) {
      rollNew.scrollToTop()
    }
  },
  scrollToBottom() {
    const rollNew = this.selectComponent('#verticalRollNew')
    if (rollNew) {
      rollNew.scrollToBottom()
    }
  },
  scrollToElement() {
    this.setData({ scrollIntoView: 'item-25' })
    setTimeout(() => {
      this.setData({ scrollIntoView: '' })
    }, 500)
  },
  scrollBy() {
    const rollNew = this.selectComponent('#verticalRollNew')
    if (rollNew) {
      rollNew.scrollBy({ top: 200, duration: 300 })
    }
  },
  changeHeight() {
    const heights = [400, 600, 800]
    const currentIndex = heights.indexOf(this.data.customHeight)
    const nextIndex = (currentIndex + 1) % heights.length
    this.setData({ customHeight: heights[nextIndex] })
  },
  onHorizontalScroll(e) {
    console.log('水平滚动', e.detail)
  }
})
