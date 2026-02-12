Component({
  externalClasses: ['custom-class'],
  relations: {
    '../ec-steps/index': {
      type: 'parent'
    }
  },
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
    // 图标
    icon: {
      type: String,
      value: ''
    },
    // 状态：process(进行中) | finish(已完成) | error(错误)
    status: {
      type: String,
      value: ''
    }
  },
  data: {
    index: 0,
    active: false,
    isLast: false,
    direction: 'horizontal'
  }
})
