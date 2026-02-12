Component({
  externalClasses: ['custom-class'],
  properties: {
    value: {
      type: Number,
      value: 1
    },
    min: {
      type: Number,
      value: 1
    },
    max: {
      type: Number,
      value: 99
    },
    step: {
      type: Number,
      value: 1
    },
    disabled: {
      type: Boolean,
      value: false
    },
    disableInput: {
      type: Boolean,
      value: false
    },
    integer: {
      type: Boolean,
      value: true
    },
    inputWidth: {
      type: String,
      value: '64rpx'
    }
  },
  data: {
    innerValue: 1
  },
  observers: {
    'value': function(val) {
      this.setData({ innerValue: this._format(val) })
    }
  },
  lifetimes: {
    attached() {
      this.setData({ innerValue: this._format(this.data.value) })
    }
  },
  methods: {
    _format(val) {
      val = Number(val)
      if (isNaN(val)) val = this.data.min
      val = Math.max(this.data.min, Math.min(this.data.max, val))
      if (this.data.integer) val = Math.round(val)
      return val
    },
    onMinus() {
      if (this.data.disabled) return
      const val = this._format(this.data.innerValue - this.data.step)
      this.setData({ innerValue: val })
      this.triggerEvent('change', { value: val })
      this.triggerEvent('minus')
    },
    onPlus() {
      if (this.data.disabled) return
      const val = this._format(this.data.innerValue + this.data.step)
      this.setData({ innerValue: val })
      this.triggerEvent('change', { value: val })
      this.triggerEvent('plus')
    },
    onInput(e) {
      const val = this._format(e.detail.value)
      this.setData({ innerValue: val })
      this.triggerEvent('change', { value: val })
    },
    onBlur(e) {
      const val = this._format(e.detail.value)
      this.setData({ innerValue: val })
      this.triggerEvent('change', { value: val })
    }
  }
})
