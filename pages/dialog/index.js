Page({
  data: {
    showBasicDialog: false,
    showNoTitleDialog: false,
    showConfirmOnly: false,
    showCustomDialog: false
  },
  // 基础对话框
  showBasic() {
    this.setData({ showBasicDialog: true })
  },
  onBasicConfirm() {
    this.setData({ showBasicDialog: false })
    wx.showToast({ title: '点击了确认', icon: 'none' })
  },
  onBasicCancel() {
    this.setData({ showBasicDialog: false })
  },
  // 无标题对话框
  showNoTitle() {
    this.setData({ showNoTitleDialog: true })
  },
  onNoTitleConfirm() {
    this.setData({ showNoTitleDialog: false })
  },
  onNoTitleClose() {
    this.setData({ showNoTitleDialog: false })
  },
  // 仅确认按钮
  showConfirm() {
    this.setData({ showConfirmOnly: true })
  },
  onConfirmOnly() {
    this.setData({ showConfirmOnly: false })
  },
  // 自定义内容
  showCustom() {
    this.setData({ showCustomDialog: true })
  },
  onCustomConfirm() {
    this.setData({ showCustomDialog: false })
  },
  onCustomClose() {
    this.setData({ showCustomDialog: false })
  }
})
