Component({
  externalClasses: ['custom-class'],
  relations: {
    '../ec-tabs/index': {
      type: 'parent'
    }
  },
  properties: {
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
    index: 0
  }
})
