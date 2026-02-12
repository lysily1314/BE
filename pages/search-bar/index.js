Page({
  data: {
    searchValue: '',
    searchResult: ''
  },
  onSearchChange(e) {
    this.setData({ searchValue: e.detail.value })
  },
  onSearch(e) {
    const value = e.detail.value
    this.setData({ searchResult: '搜索: ' + value })
    wx.showToast({ title: '搜索: ' + value, icon: 'none' })
  },
  onClear() {
    this.setData({ searchValue: '', searchResult: '' })
  }
})
