Component({
  externalClasses: ['custom-class'],
  options: {
    multipleSlots: true
  },
  relations: {
    '../ec-list/index': {
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
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    },
    // 自定义左侧图标
    leftIcon: {
      type: String,
      value: ''
    },
    // 右侧图标
    rightIcon: {
      type: String,
      value: 'arrow-right'
    },
    // 是否显示箭头
    isLink: {
      type: Boolean,
      value: false
    },
    // 自定义点击跳转链接
    url: {
      type: String,
      value: ''
    }
  },
  data: {
    // 父组件传递的状态
    isLast: false,
    showBorder: true,
    showBorderTop: false,
    showBorderBottom: true
  },
  methods: {
    updateBorder(data) {
      this.setData(data)
    },
    onTap() {
      if (this.data.disabled) return
      this.triggerEvent('tap')
      if (this.data.url) {
        wx.navigateTo({ url: this.data.url })
      }
    }
  }
})
