Component({
  externalClasses: ['custom-class'],
  relations: {
    '../ec-grid-item/index': {
      type: 'child',
      linked() {
        this._updateChildren()
      },
      unlinked() {
        this._updateChildren()
      }
    }
  },
  properties: {
    // 列数
    column: {
      type: Number,
      value: 3
    },
    // 是否显示边框
    border: {
      type: Boolean,
      value: true
    },
    // 是否显示列边框
    columnBorder: {
      type: Boolean,
      value: true
    },
    // 是否显示行边框
    rowBorder: {
      type: Boolean,
      value: true
    },
    // 是否开启点击反馈
    clickable: {
      type: Boolean,
      value: false
    },
    // 方向：horizontal(水平) | vertical(垂直)
    direction: {
      type: String,
      value: 'vertical'
    },
    // 图标大小
    iconSize: {
      type: String,
      value: '48rpx'
    },
    // 文字大小
    textSize: {
      type: String,
      value: 'var(--ec-font-sm, 24rpx)'
    },
    // 图标与文字间距
    gap: {
      type: String,
      value: '16rpx'
    },
    // 背景色
    background: {
      type: String,
      value: ''
    }
  },
  data: {
    children: []
  },
  methods: {
    // 更新子组件
    _updateChildren() {
      this._debounce(() => {
        const items = this.getRelationNodes('../ec-grid-item/index')
        this.setData({ children: items })
      })
    },
    
    // 防抖
    _debounce(fn) {
      clearTimeout(this._timer)
      this._timer = setTimeout(fn, 50)
    }
  },
  
  detached() {
    clearTimeout(this._timer)
  }
})
