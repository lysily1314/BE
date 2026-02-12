Component({
  externalClasses: ['custom-class'],
  relations: {
    '../ec-radio-group/index': {
      type: 'parent'
    }
  },
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
      value: 'round' // round | square
    }
  },
  methods: {
    onTap() {
      if (this.data.disabled) return
      this.triggerEvent('change', { value: this.data.name })
    }
  }
})
