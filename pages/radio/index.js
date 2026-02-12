Page({
  data: {
    radioValue: '1',
    cb1: true,
    cb2: false,
    cb3: false
  },
  onRadioChange(e) {
    this.setData({ radioValue: e.detail.value })
  },
  onCb1Change(e) { this.setData({ cb1: e.detail.value }) },
  onCb2Change(e) { this.setData({ cb2: e.detail.value }) },
  onCb3Change(e) { this.setData({ cb3: e.detail.value }) }
})
