Page({
  data: { count1: 1, count2: 2, count3: 1 },
  onCount1Change(e) { this.setData({ count1: e.detail.value }) },
  onCount2Change(e) { this.setData({ count2: e.detail.value }) },
  onCount3Change(e) { this.setData({ count3: e.detail.value }) }
})
