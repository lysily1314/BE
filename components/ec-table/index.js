Component({
  externalClasses: ['custom-class'],
  properties: {
    data: {
      type: Array,
      value: []
    },
    columns: {
      type: Array,
      value: []
    },
    border: {
      type: Boolean,
      value: true
    },
    stripe: {
      type: Boolean,
      value: false
    },
    hover: {
      type: Boolean,
      value: true
    },
    height: {
      type: String,
      value: ''
    },
    maxHeight: {
      type: String,
      value: ''
    },
    width: {
      type: String,
      value: '100%'
    },
    headerBackground: {
      type: String,
      value: '#f5f5f5'
    },
    headerColor: {
      type: String,
      value: '#333'
    },
    headerFontSize: {
      type: String,
      value: '28rpx'
    },
    headerFontWeight: {
      type: String,
      value: '500'
    },
    headerAlign: {
      type: String,
      value: 'center'
    },
    bodyBackground: {
      type: String,
      value: '#fff'
    },
    bodyColor: {
      type: String,
      value: '#666'
    },
    bodyFontSize: {
      type: String,
      value: '28rpx'
    },
    bodyAlign: {
      type: String,
      value: 'center'
    },
    stripeBackground: {
      type: String,
      value: '#fafafa'
    },
    hoverBackground: {
      type: String,
      value: '#f0f0f0'
    },
    borderColor: {
      type: String,
      value: '#ebedf0'
    },
    borderWidth: {
      type: String,
      value: '1rpx'
    },
    fixedHeader: {
      type: Boolean,
      value: false
    },
    scrollX: {
      type: Boolean,
      value: false
    },
    scrollY: {
      type: Boolean,
      value: false
    },
    showScrollbar: {
      type: Boolean,
      value: true
    },
    rowHeight: {
      type: String,
      value: 'auto'
    },
    cellPadding: {
      type: String,
      value: '24rpx 32rpx'
    },
    emptyText: {
      type: String,
      value: '暂无数据'
    },
    loading: {
      type: Boolean,
      value: false
    },
    loadingText: {
      type: String,
      value: '加载中...'
    },
    indexColumn: {
      type: Boolean,
      value: false
    },
    indexTitle: {
      type: String,
      value: '序号'
    },
    selection: {
      type: Boolean,
      value: false
    },
    selectionColumn: {
      type: Boolean,
      value: false
    },
    selectedRowKeys: {
      type: Array,
      value: []
    },
    rowKey: {
      type: String,
      value: 'id'
    },
    virtualScroll: {
      type: Boolean,
      value: false
    },
    itemHeight: {
      type: Number,
      value: 80
    },
    visibleCount: {
      type: Number,
      value: 10
    }
  },
  data: {
    selectedKeys: [],
    scrollTop: 0,
    scrollLeft: 0,
    visibleData: [],
    startIndex: 0,
    endIndex: 10
  },
  lifetimes: {
    ready() {
      this.initTable()
    },
    detached() {
      this.clearScrollTimer()
    }
  },
  observers: {
    'data': function(newData) {
      if (newData) {
        this.updateVisibleData()
      }
    },
    'selectedRowKeys': function(newKeys) {
      this.setData({
        selectedKeys: newKeys || []
      })
    },
    'virtualScroll, visibleCount': function() {
      this.updateVisibleData()
    }
  },
  methods: {
    initTable() {
      this.setData({
        selectedKeys: this.properties.selectedRowKeys || []
      })
      this.updateVisibleData()
    },
    updateVisibleData() {
      const { data, virtualScroll, visibleCount, itemHeight } = this.properties
      
      if (!virtualScroll || !data || data.length === 0) {
        this.setData({
          visibleData: data || []
        })
        return
      }
      
      const startIndex = this.data.startIndex || 0
      const endIndex = Math.min(startIndex + visibleCount, data.length)
      
      this.setData({
        visibleData: data.slice(startIndex, endIndex),
        startIndex,
        endIndex
      })
    },
    onScroll(e) {
      const { scrollTop, scrollLeft } = e.detail
      
      this.setData({
        scrollTop,
        scrollLeft
      })
      
      if (this.properties.virtualScroll) {
        this.handleVirtualScroll(scrollTop)
      }
      
      this.triggerEvent('scroll', {
        scrollTop,
        scrollLeft
      })
    },
    handleVirtualScroll(scrollTop) {
      const { itemHeight, visibleCount } = this.properties
      const { data } = this.properties
      
      if (!data || data.length === 0) return
      
      const startIndex = Math.floor(scrollTop / itemHeight)
      
      if (startIndex !== this.data.startIndex) {
        this.updateVisibleData()
      }
    },
    onCellClick(e) {
      const { row, column, value } = e.currentTarget.dataset
      
      this.triggerEvent('cellclick', {
        row,
        column,
        value
      })
    },
    onRowClick(e) {
      const { row } = e.currentTarget.dataset
      
      this.triggerEvent('rowclick', {
        row
      })
    },
    onSelectionChange(e) {
      const { row, key } = e.currentTarget.dataset
      const { selectedKeys } = this.data
      
      const index = selectedKeys.indexOf(key)
      let newSelectedKeys
      
      if (index > -1) {
        newSelectedKeys = selectedKeys.filter(k => k !== key)
      } else {
        newSelectedKeys = [...selectedKeys, key]
      }
      
      this.setData({
        selectedKeys: newSelectedKeys
      })
      
      this.triggerEvent('selectionchange', {
        selectedKeys: newSelectedKeys,
        row,
        selected: index === -1
      })
    },
    toggleRowSelection(row) {
      const { rowKey } = this.properties
      const key = row[rowKey]
      const { selectedKeys } = this.data
      
      const index = selectedKeys.indexOf(key)
      let newSelectedKeys
      
      if (index > -1) {
        newSelectedKeys = selectedKeys.filter(k => k !== key)
      } else {
        newSelectedKeys = [...selectedKeys, key]
      }
      
      this.setData({
        selectedKeys: newSelectedKeys
      })
      
      this.triggerEvent('selectionchange', {
        selectedKeys: newSelectedKeys,
        row,
        selected: index === -1
      })
    },
    selectAll() {
      const { data, rowKey } = this.properties
      const allKeys = data.map(row => row[rowKey])
      
      this.setData({
        selectedKeys: allKeys
      })
      
      this.triggerEvent('selectionchange', {
        selectedKeys: allKeys,
        all: true
      })
    },
    clearSelection() {
      this.setData({
        selectedKeys: []
      })
      
      this.triggerEvent('selectionchange', {
        selectedKeys: [],
        all: false
      })
    },
    getSelectedRows() {
      const { data, rowKey } = this.properties
      const { selectedKeys } = this.data
      
      return data.filter(row => selectedKeys.includes(row[rowKey]))
    },
    getSelectedKeys() {
      return this.data.selectedKeys
    },
    scrollToTop() {
      this.setData({
        scrollTop: 0
      })
    },
    scrollToBottom() {
      const { data, itemHeight } = this.properties
      
      if (!data || data.length === 0) return
      
      this.setData({
        scrollTop: data.length * itemHeight
      })
    },
    scrollToRow(index) {
      const { itemHeight } = this.properties
      
      this.setData({
        scrollTop: index * itemHeight
      })
    },
    refresh() {
      this.updateVisibleData()
      this.triggerEvent('refresh')
    },
    clearScrollTimer() {
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer)
        this.scrollTimer = null
      }
    },
    getColumnWidth(column) {
      return column.width || 'auto'
    },
    getColumnAlign(column) {
      return column.align || this.properties.bodyAlign
    },
    getCellValue(row, column) {
      const { key } = column
      
      if (typeof column.render === 'function') {
        return column.render(row, key, row[key])
      }
      
      return row[key]
    },
    isRowSelected(row) {
      const { rowKey } = this.properties
      const { selectedKeys } = this.data
      const key = row[rowKey]
      
      return selectedKeys.includes(key)
    }
  }
})
