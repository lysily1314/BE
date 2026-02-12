Component({
  externalClasses: ['custom-class'],
  relations: {
    '../ec-grid/index': {
      type: 'parent'
    }
  },
  properties: {
    // 图标
    icon: {
      type: String,
      value: ''
    },
    // 图标颜色
    iconColor: {
      type: String,
      value: ''
    },
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
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    },
    // 背景色
    background: {
      type: String,
      value: ''
    }
  },
  data: {
    parent: null
  },
  lifetimes: {
    attached() {
      const parent = this.getRelationNodes('../ec-grid/index')[0]
      if (parent) {
        this.setData({ parent })
      }
    }
  },
  methods: {
    // 点击事件
    onClick() {
      if (this.data.disabled) return
      this.triggerEvent('click')
    }
  }
})
