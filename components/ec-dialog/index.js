Component({
  externalClasses: ['custom-class'],
  options: {
    multipleSlots: true
  },
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer(val) {
        if (val) {
          this.setData({ visible: true })
          setTimeout(() => {
            this.setData({ animating: true })
          }, 20)
        } else {
          this.setData({ animating: false })
          this._hideTimer = setTimeout(() => {
            this.setData({ visible: false })
          }, 300)
        }
      }
    },
    title: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    showCancel: {
      type: Boolean,
      value: true
    },
    confirmText: {
      type: String,
      value: '确认'
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    confirmColor: {
      type: String,
      value: ''
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: false
    }
  },
  data: {
    visible: false,
    animating: false
  },
  methods: {
    onConfirm() {
      this.triggerEvent('confirm')
    },
    onCancel() {
      this.triggerEvent('cancel')
      this.triggerEvent('close')
    },
    onMaskTap() {
      if (this.data.closeOnClickOverlay) {
        this.triggerEvent('close')
      }
    },
    noop() {}
  },
  detached() {
    if (this._hideTimer) clearTimeout(this._hideTimer)
  }
})
