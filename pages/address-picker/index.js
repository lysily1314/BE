Page({
  data: {
    showAddressPicker: false,
    selectedAddress: '',
    addressValue: []
  },

  onShowPicker() {
    this.setData({
      showAddressPicker: true
    });
  },

  onAddressConfirm(e) {
    const { value } = e.detail;
    this.setData({
      selectedAddress: value.join(' '),
      addressValue: value,
      showAddressPicker: false
    });
    wx.showToast({
      title: '选择成功',
      icon: 'success'
    });
  },

  onAddressCancel() {
    this.setData({
      showAddressPicker: false
    });
    wx.showToast({
      title: '已取消',
      icon: 'none'
    });
  },

  onAddressClose() {
    this.setData({
      showAddressPicker: false
    });
  },

  onClearAddress() {
    this.setData({
      selectedAddress: '',
      addressValue: []
    });
  }
})
