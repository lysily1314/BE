Component({
  externalClasses: ['custom-class'],
  properties: {
    // 类型：success | warning | info | error
    type: {
      type: String,
      value: 'info'
    },
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 内容
    message: {
      type: String,
      value: ''
    },
    // 是否可关闭
    closable: {
      type: Boolean,
      value: false
    },
    // 是否显示图标
    showIcon: {
      type: Boolean,
      value: true
    },
    // 图标大小
    iconSize: {
      type: String,
      value: '32rpx'
    },
    // 背景色
    background: {
      type: String,
      value: ''
    },
    // 文字颜色
    color: {
      type: String,
      value: ''
    },
    // 边框颜色
    borderColor: {
      type: String,
      value: ''
    },
    // 圆角
    radius: {
      type: String,
      value: 'var(--ec-radius, 8rpx)'
    },
    // 内边距
    padding: {
      type: String,
      value: '24rpx 32rpx'
    }
  },
  data: {
    visible: true
  },
  methods: {
    onClose() {
      this.setData({ visible: false })
      this.triggerEvent('close')
    }
  }
})
