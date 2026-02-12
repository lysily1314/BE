Page({
  data: {
    showLeftDrawer: false,
    showRightDrawer: false,
    showTopDrawer: false,
    showBottomDrawer: false,
    showCustomDrawer: false
  },

  // 打开左侧抽屉
  showLeftDrawer() {
    this.setData({
      showLeftDrawer: true
    });
  },

  // 打开右侧抽屉
  showRightDrawer() {
    this.setData({
      showRightDrawer: true
    });
  },

  // 打开顶部抽屉
  showTopDrawer() {
    this.setData({
      showTopDrawer: true
    });
  },

  // 打开底部抽屉
  showBottomDrawer() {
    this.setData({
      showBottomDrawer: true
    });
  },

  // 打开自定义抽屉
  showCustomDrawer() {
    this.setData({
      showCustomDrawer: true
    });
  },

  // 关闭抽屉
  onClose() {
    this.setData({
      showLeftDrawer: false,
      showRightDrawer: false,
      showTopDrawer: false,
      showBottomDrawer: false,
      showCustomDrawer: false
    });
  }
})
