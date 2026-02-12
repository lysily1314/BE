Page({
  data: {
    showDatePicker: false,
    selectedDate: '',
    dateValue: '',
    minDate: '2020-01-01',
    maxDate: '2030-12-31'
  },

  onShowPicker() {
    this.setData({
      showDatePicker: true
    });
  },

  onDateConfirm(e) {
    const { value } = e.detail;
    this.setData({
      selectedDate: value,
      dateValue: value,
      showDatePicker: false
    });
    wx.showToast({
      title: '选择成功',
      icon: 'success'
    });
  },

  onDateCancel() {
    this.setData({
      showDatePicker: false
    });
    wx.showToast({
      title: '已取消',
      icon: 'none'
    });
  },

  onDateClose() {
    this.setData({
      showDatePicker: false
    });
  },

  onClearDate() {
    this.setData({
      selectedDate: '',
      dateValue: ''
    });
  },
  
  onSetToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    this.setData({
      selectedDate: todayStr,
      dateValue: todayStr
    });
    
    wx.showToast({
      title: '已设置为今天',
      icon: 'success'
    });
  }
})
