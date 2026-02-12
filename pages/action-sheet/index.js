Page({
  data: {
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    actions1: [
      { name: '拍照' },
      { name: '从相册选择' }
    ],
    actions2: [
      { name: '保存图片', subname: '保存到系统相册' },
      { name: '收藏', subname: '添加到收藏夹' },
      { name: '分享', subname: '分享给好友' }
    ],
    actions3: [
      { name: '编辑', color: '#1989fa' },
      { name: '删除', color: '#ee0a24' },
      { name: '禁用选项', disabled: true }
    ],
    actions4: [
      { name: '加载中', loading: true },
      { name: '普通选项' }
    ]
  },
  onShow1() { this.setData({ show1: true }) },
  onShow2() { this.setData({ show2: true }) },
  onShow3() { this.setData({ show3: true }) },
  onShow4() { this.setData({ show4: true }) },
  onClose1() { this.setData({ show1: false }) },
  onClose2() { this.setData({ show2: false }) },
  onClose3() { this.setData({ show3: false }) },
  onClose4() { this.setData({ show4: false }) },
  onSelect1(e) {
    wx.showToast({ title: '选择了：' + e.detail.name, icon: 'none' })
  },
  onSelect2(e) {
    wx.showToast({ title: '选择了：' + e.detail.name, icon: 'none' })
  },
  onSelect3(e) {
    wx.showToast({ title: '选择了：' + e.detail.name, icon: 'none' })
  },
  onSelect4(e) {
    wx.showToast({ title: '选择了：' + e.detail.name, icon: 'none' })
  }
})
