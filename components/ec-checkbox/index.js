Component({
  externalClasses: ['custom-class'],
  properties: {
    name: {
      type: null,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    checked: {
      type: Boolean,
      value: false
    },
    iconSize: {
      type: String,
      value: '36rpx'
    },
    checkedColor: {
      type: String,
      value: ''
    },
    shape: {
      type: String,
      value: 'square' // round | square
    }
  },
  methods: {
    onTap() {
      if (this.data.disabled) return
      const checked = !this.data.checked
      this.triggerEvent('change', { value: checked, name: this.data.name })
    }
  }
})
