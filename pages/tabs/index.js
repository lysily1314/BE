Page({
  data: {
    active1: 0,
    active2: 1,
    active3: 0,
    active4: 0
  },
  onTabChange1(e) {
    this.setData({ active1: e.detail.index })
  },
  onTabChange2(e) {
    this.setData({ active2: e.detail.index })
  },
  onTabChange3(e) {
    this.setData({ active3: e.detail.index })
  },
  onTabChange4(e) {
    this.setData({ active4: e.detail.index })
  }
})
