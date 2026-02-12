Page({
  data: {
    showToast: false,
    toastType: 'text',
    toastMessage: ''
  },
  showTextToast() {
    this.setData({
      showToast: true,
      toastType: 'text',
      toastMessage: '这是一条提示'
    })
  },
  showSuccessToast() {
    this.setData({
      showToast: true,
      toastType: 'success',
      toastMessage: '操作成功'
    })
  },
  showErrorToast() {
    this.setData({
      showToast: true,
      toastType: 'error',
      toastMessage: '操作失败'
    })
  },
  showLoadingToast() {
    this.setData({
      showToast: true,
      toastType: 'loading',
      toastMessage: '加载中...'
    })
    setTimeout(() => {
      this.setData({ showToast: false })
    }, 3000)
  },
  showCommandToast() {
    const toast = this.selectComponent('#toast')
    if (toast) {
      toast.show({
        type: 'success',
        message: '命令式调用',
        duration: 2000
      })
    }
  },
  onToastClose() {
    this.setData({ showToast: false })
  }
})
