Component({
  externalClasses: ['custom-class'],
  properties: {
    name: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      value: '40rpx'
    },
    color: {
      type: String,
      value: ''
    }
  },
  methods: {
    onTap() {
      this.triggerEvent('tap')
    }
  }
})
