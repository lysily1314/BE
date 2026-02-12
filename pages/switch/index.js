Page({
  data: { s1: false, s2: true, s3: true, sLoading: true },
  onS1Change(e) { this.setData({ s1: e.detail.value }) },
  onS2Change(e) { this.setData({ s2: e.detail.value }) },
  onLoadingChange(e) {
    this.setData({ sLoading: false })
    setTimeout(() => {
      this.setData({ s3: e.detail.value, sLoading: false })
    }, 500)
  }
})
