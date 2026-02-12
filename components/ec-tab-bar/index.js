Component({
  externalClasses: ['custom-class'],
  relations: {
    '../ec-tab-bar-item/index': {
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
    // 当前激活的标签索引
    active: {
      type: Number,
      value: 0,
      observer() {
        this._updateChildren()
      }
    },
    // 是否固定在底部
    fixed: {
      type: Boolean,
      value: false
    },
    // 是否开启安全区适配
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    // 是否显示顶部边框
    border: {
      type: Boolean,
      value: true
    },
    // 背景色
    background: {
      type: String,
      value: ''
    },
    // 激活标签颜色
    activeColor: {
      type: String,
      value: ''
    },
    // 未激活标签颜色
    inactiveColor: {
      type: String,
      value: ''
    },
    // 图标大小
    iconSize: {
      type: String,
      value: '40rpx'
    },
    // 文字大小
    textSize: {
      type: String,
      value: 'var(--ec-font-xs, 20rpx)'
    },
    // 图标与文字间距
    gap: {
      type: String,
      value: '8rpx'
    },
    // zIndex
    zIndex: {
      type: Number,
      value: 100
    }
  },
  data: {
    children: []
  },
  methods: {
    // 更新子组件
    _updateChildren() {
      this._debounce(() => {
        const items = this.getRelationNodes('../ec-tab-bar-item/index')
        items.forEach((item, index) => {
          item.setData({
            active: index === this.data.active,
            parentData: this.data
          })
        })
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
