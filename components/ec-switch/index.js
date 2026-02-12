Component({
  externalClasses: ['custom-class'],
  properties: {
    checked: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false
    },
    size: {
      type: String,
      value: '52rpx'
    },
    activeColor: {
      type: String,
      value: ''
    },
    inactiveColor: {
      type: String,
      value: ''
    }
  },
  methods: {
    onTap() {
      if (this.data.disabled || this.data.loading) return
      const checked = !this.data.checked
      this.triggerEvent('change', { value: checked })
    }
  }
})
