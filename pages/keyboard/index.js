Page({
  data: {
    inputValue: '',
    showNumberKeyboard: false,
    showIdCardKeyboard: false,
    showCarKeyboard: false,
    showRandomKeyboard: false,
    carInputValue: ''
  },

  // 输入框聚焦时显示键盘
  onInputFocus(e) {
    const type = e.currentTarget.dataset.type;
    if (type === 'number') {
      this.setData({ showNumberKeyboard: true });
    } else if (type === 'idcard') {
      this.setData({ showIdCardKeyboard: true });
    } else if (type === 'car') {
      this.setData({ showCarKeyboard: true });
    } else if (type === 'random') {
      this.setData({ showRandomKeyboard: true });
    }
  },

  // 输入事件
  onInput(e) {
    const { key } = e.detail;
    // 根据当前显示的键盘类型来更新对应的值
    if (this.data.showNumberKeyboard) {
      this.setData({
        inputValue: this.data.inputValue + key
      });
    } else if (this.data.showCarKeyboard) {
      this.setData({
        carInputValue: this.data.carInputValue + key
      });
    }
  },

  // 删除事件
  onDelete(e) {
    // 根据当前显示的键盘类型来更新对应的值
    if (this.data.showNumberKeyboard) {
      this.setData({
        inputValue: this.data.inputValue.slice(0, -1)
      });
    } else if (this.data.showCarKeyboard) {
      this.setData({
        carInputValue: this.data.carInputValue.slice(0, -1)
      });
    }
  },

  // 完成事件
  onConfirm(e) {
    // 关闭所有键盘
    this.setData({ 
      showNumberKeyboard: false,
      showIdCardKeyboard: false,
      showCarKeyboard: false,
      showRandomKeyboard: false
    });
    wx.showToast({
      title: '输入完成',
      icon: 'success'
    });
  },

  // 关闭键盘
  onClose(e) {
    // 关闭所有键盘
    this.setData({ 
      showNumberKeyboard: false,
      showIdCardKeyboard: false,
      showCarKeyboard: false,
      showRandomKeyboard: false
    });
  }
})
