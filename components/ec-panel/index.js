Component({
  externalClasses: ['custom-class'],
  properties: {
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 标题下方描述信息
    desc: {
      type: String,
      value: ''
    },
    // 底部区域
    footer: {
      type: String,
      value: ''
    },
    // 是否显示内边距
    padding: {
      type: Boolean,
      value: true
    },
    // 是否显示外边框
    border: {
      type: Boolean,
      value: true
    },
    // 圆角大小
    radius: {
      type: String,
      value: 'var(--ec-radius, 8rpx)'
    },
    // 背景色
    background: {
      type: String,
      value: 'var(--ec-white, #fff)'
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
    // 底部颜色
    footerColor: {
      type: String,
      value: 'var(--ec-text-secondary, #666)'
    }
  },
  data: {},
  methods: {}
})
