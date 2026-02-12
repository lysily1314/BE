Component({
  externalClasses: ['custom-class'],
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer(val) {
        if (val) {
          this._startTimer()
          this.setData({ visible: true, animating: true })
        } else {
          this.setData({ animating: false })
          this._hideTimer = setTimeout(() => {
            this.setData({ visible: false })
          }, 300)
        }
      }
    },
    type: {
      type: String,
      value: 'text' // success | error | loading | text
    },
    message: {
      type: String,
      value: ''
    },
    duration: {
      type: Number,
      value: 2000
    },
    mask: {
      type: Boolean,
      value: false
    }
  },
  data: {
    visible: false,
    animating: false
  },
  methods: {
    // 命令式调用
    show(options = {}) {
      const { type = 'text', message = '', duration = 2000, mask = false } = options
      if (this._hideTimer) clearTimeout(this._hideTimer)
      this.setData({
        type,
        message,
        duration,
        mask,
        show: true,
        visible: true,
        animating: true
      })
      this._startTimer()
    },
    hide() {
      this.setData({ animating: false })
      this._hideTimer = setTimeout(() => {
        this.setData({ show: false, visible: false })
        this.triggerEvent('close')
      }, 300)
    },
    _startTimer() {
      if (this._timer) clearTimeout(this._timer)
      if (this.data.type === 'loading') return // loading 不自动关闭
      const duration = this.data.duration
      if (duration > 0) {
        this._timer = setTimeout(() => {
          this.hide()
        }, duration)
      }
    },
    noop() {}
  },
  detached() {
    if (this._timer) clearTimeout(this._timer)
    if (this._hideTimer) clearTimeout(this._hideTimer)
  }
})
