Page({
  data: { remark: '', feedback: '' },
  onRemarkChange(e) { this.setData({ remark: e.detail.value }) },
  onFeedbackChange(e) { this.setData({ feedback: e.detail.value }) }
})
