Page({
  data: { rate1: 3, rate2: 4.5, rate3: 0 },
  onRate1Change(e) { this.setData({ rate1: e.detail.value }) },
  onRate2Change(e) { this.setData({ rate2: e.detail.value }) },
  onRate3Change(e) { this.setData({ rate3: e.detail.value }) }
})
