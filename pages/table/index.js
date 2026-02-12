Page({
  data: {
    basicData: [
      { id: 1, name: '张三', age: 25, gender: '男', city: '北京' },
      { id: 2, name: '李四', age: 30, gender: '女', city: '上海' },
      { id: 3, name: '王五', age: 28, gender: '男', city: '广州' },
      { id: 4, name: '赵六', age: 22, gender: '女', city: '深圳' },
      { id: 5, name: '钱七', age: 35, gender: '男', city: '杭州' }
    ],
    basicColumns: [
      { key: 'name', title: '姓名', width: '120rpx' },
      { key: 'age', title: '年龄', width: '80rpx', align: 'center' },
      { key: 'gender', title: '性别', width: '80rpx', align: 'center' },
      { key: 'city', title: '城市', width: '100rpx' }
    ],
    productData: [
      { id: 1, name: 'iPhone 15', price: 5999, stock: 100, status: '在售' },
      { id: 2, name: 'MacBook Pro', price: 12999, stock: 50, status: '在售' },
      { id: 3, name: 'iPad Air', price: 4799, stock: 200, status: '在售' },
      { id: 4, name: 'AirPods Pro', price: 1899, stock: 300, status: '在售' },
      { id: 5, name: 'Apple Watch', price: 2999, stock: 150, status: '缺货' }
    ],
    productColumns: [
      { key: 'name', title: '商品名称', width: '200rpx' },
      { key: 'price', title: '价格', width: '120rpx', align: 'right' },
      { key: 'stock', title: '库存', width: '100rpx', align: 'center' },
      { key: 'status', title: '状态', width: '100rpx', align: 'center' }
    ],
    orderData: [
      { id: '202401010001', customer: '张三', amount: 5999, date: '2024-01-01', status: '已完成' },
      { id: '202401010002', customer: '李四', amount: 12999, date: '2024-01-02', status: '进行中' },
      { id: '202401010003', customer: '王五', amount: 4799, date: '2024-01-03', status: '已完成' },
      { id: '202401010004', customer: '赵六', amount: 1899, date: '2024-01-04', status: '待发货' },
      { id: '202401010005', customer: '钱七', amount: 2999, date: '2024-01-05', status: '已取消' }
    ],
    orderColumns: [
      { key: 'id', title: '订单号', width: '200rpx' },
      { key: 'customer', title: '客户', width: '100rpx' },
      { key: 'amount', title: '金额', width: '120rpx', align: 'right' },
      { key: 'date', title: '日期', width: '150rpx' },
      { key: 'status', title: '状态', width: '100rpx', align: 'center' }
    ],
    largeData: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `商品${i + 1}`,
      price: Math.floor(Math.random() * 10000) + 100,
      stock: Math.floor(Math.random() * 500) + 10,
      sales: Math.floor(Math.random() * 1000)
    })),
    largeColumns: [
      { key: 'id', title: 'ID', width: '80rpx', align: 'center' },
      { key: 'name', title: '商品名称', width: '150rpx' },
      { key: 'price', title: '价格', width: '120rpx', align: 'right' },
      { key: 'stock', title: '库存', width: '100rpx', align: 'center' },
      { key: 'sales', title: '销量', width: '100rpx', align: 'center' }
    ],
    selectedRowKeys: [],
    showIndex: true,
    showSelection: false,
    showStripe: false,
    showHover: true,
    showBorder: true,
    fixedHeader: false,
    scrollY: false,
    scrollX: false,
    loading: false,
    emptyData: []
  },
  onCellClick(e) {
    const { row, column, value } = e.detail
    console.log('单元格点击', { row, column, value })
    wx.showToast({
      title: `点击了第${row + 1}行第${column + 1}列`,
      icon: 'none'
    })
  },
  onRowClick(e) {
    const { row } = e.detail
    console.log('行点击', row)
  },
  onSelectionChange(e) {
    const { selectedKeys, row, selected } = e.detail
    this.setData({
      selectedRowKeys: selectedKeys
    })
    console.log('选择变化', { selectedKeys, row, selected })
  },
  toggleIndex() {
    this.setData({
      showIndex: !this.data.showIndex
    })
  },
  toggleSelection() {
    this.setData({
      showSelection: !this.data.showSelection,
      selectedRowKeys: []
    })
  },
  toggleStripe() {
    this.setData({
      showStripe: !this.data.showStripe
    })
  },
  toggleHover() {
    this.setData({
      showHover: !this.data.showHover
    })
  },
  toggleBorder() {
    this.setData({
      showBorder: !this.data.showBorder
    })
  },
  toggleFixedHeader() {
    this.setData({
      fixedHeader: !this.data.fixedHeader
    })
  },
  toggleScrollY() {
    this.setData({
      scrollY: !this.data.scrollY
    })
  },
  toggleScrollX() {
    this.setData({
      scrollX: !this.data.scrollX
    })
  },
  toggleLoading() {
    this.setData({
      loading: !this.data.loading
    })
  },
  selectAll() {
    const table = this.selectComponent('#productTable')
    if (table) {
      table.selectAll()
    }
  },
  clearSelection() {
    const table = this.selectComponent('#productTable')
    if (table) {
      table.clearSelection()
    }
  },
  getSelectedRows() {
    const table = this.selectComponent('#productTable')
    if (table) {
      const rows = table.getSelectedRows()
      console.log('选中的行', rows)
      wx.showToast({
        title: `选中了${rows.length}行`,
        icon: 'none'
      })
    }
  },
  refreshTable() {
    const table = this.selectComponent('#productTable')
    if (table) {
      table.refresh()
      wx.showToast({
        title: '表格已刷新',
        icon: 'none'
      })
    }
  },
  scrollToTop() {
    const table = this.selectComponent('#largeTable')
    if (table) {
      table.scrollToTop()
    }
  },
  scrollToBottom() {
    const table = this.selectComponent('#largeTable')
    if (table) {
      table.scrollToBottom()
    }
  }
})
