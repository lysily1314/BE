Component({
  externalClasses: ['custom-class'],
  properties: {
    // 标签内容
    content: {
      type: String,
      value: ''
    },
    // 类型：primary | success | warning | danger
    type: {
      type: String,
      value: 'primary'
    },
    // 尺寸：small | medium | large
    size: {
      type: String,
      value: 'medium'
    },
    // 形状：round | square
    shape: {
      type: String,
      value: 'round'
    },
    // 是否为空心样式
    plain: {
      type: Boolean,
      value: false
    },
    // 是否为标记样式
    mark: {
      type: Boolean,
      value: false
    },
    // 是否可关闭
    closable: {
      type: Boolean,
      value: false
    },
    // 是否为块级元素
    block: {
      type: Boolean,
      value: false
    },
    // 自定义颜色
    color: {
      type: String,
      value: ''
    },
    // 自定义文字颜色
    textColor: {
      type: String,
      value: ''
    },
    // 标签大小
    tagSize: {
      type: String,
      value: 'auto'
    }
  },
  data: {},
  methods: {
    onClose(e) {
      if (this.properties.closable) {
        this.triggerEvent('close', e.detail)
      }
    }
  }
})
