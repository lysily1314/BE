Component({
  externalClasses: ['custom-class'],
  properties: {
    // 是否显示
    show: {
      type: Boolean,
      value: false,
      observer(val) {
        if (val) {
          this.setData({ visible: true, animating: true })
        } else {
          this.setData({ animating: false })
          this._hideTimer = setTimeout(() => {
            this.setData({ visible: false })
          }, 300)
        }
      }
    },
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 选项列表
    actions: {
      type: Array,
      value: []
    },
    // 取消按钮文字
    cancelText: {
      type: String,
      value: '取消'
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      value: true
    },
    // 是否显示遮罩层
    mask: {
      type: Boolean,
      value: true
    },
    // 点击遮罩是否关闭
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    // 是否开启安全区适配
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    // 圆角大小
    borderRadius: {
      type: String,
      value: 'var(--ec-radius-lg, 16rpx)'
    }
  },
  data: {
    visible: false,
    animating: false
  },
  methods: {
    // 选择选项
    onSelect(e) {
      const { index } = e.currentTarget.dataset
      const item = this.data.actions[index]
      
      if (item && !item.disabled && !item.loading) {
        this.triggerEvent('select', { index, name: item.name })
        this._hide()
      }
    },
    
    // 取消
    onCancel() {
      this.triggerEvent('cancel')
      this._hide()
    },
    
    // 点击遮罩
    onOverlay() {
      this.triggerEvent('click-overlay')
      if (this.data.closeOnClickOverlay) {
        this._hide()
      }
    },
    
    // 关闭面板
    _hide() {
      this.setData({ animating: false })
      this._hideTimer = setTimeout(() => {
        this.setData({ show: false, visible: false })
        this.triggerEvent('close')
      }, 300)
    },
    
    // 阻止滚动穿透
    noop() {}
  },
  
  detached() {
    if (this._hideTimer) clearTimeout(this._hideTimer)
  }
})
