Component({
  externalClasses: ['custom-class'],
  properties: {
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 描述
    desc: {
      type: String,
      value: ''
    },
    // 标签
    tag: {
      type: String,
      value: ''
    },
    // 标签类型：primary | success | warning | danger
    tagType: {
      type: String,
      value: 'danger'
    },
    // 是否显示标签
    showTag: {
      type: Boolean,
      value: true
    },
    // 圆角大小
    radius: {
      type: String,
      value: 'var(--ec-radius-lg, 16rpx)'
    },
    // 阴影：none | light | heavy
    shadow: {
      type: String,
      value: 'light'
    },
    // 背景色
    background: {
      type: String,
      value: 'var(--ec-white, #fff)'
    },
    // 边框颜色
    borderColor: {
      type: String,
      value: 'var(--ec-border, #eee)'
    },
    // 标题颜色
    titleColor: {
      type: String,
      value: 'var(--ec-text-primary, #333)'
    },
    // 描述颜色
    descColor: {
      type: String,
      value: 'var(--ec-text-secondary, #666)'
    },
    // 是否显示底部边框
    showBottomBorder: {
      type: Boolean,
      value: true
    },
    // 是否可点击
    clickable: {
      type: Boolean,
      value: false
    }
  },
  data: {
    hasHeader: false,
    hasFooter: false
  },
  lifetimes: {
    attached() {
      // 检查是否有 header 和 footer 插槽内容
      // 这里只是初始化值，实际判断需要在页面渲染后
    }
  },
  methods: {
    onClick(e) {
      if (this.data.clickable) {
        this.triggerEvent('click', e.detail)
      }
    }
  }
})
