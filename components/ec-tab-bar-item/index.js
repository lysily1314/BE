Component({
  externalClasses: ['custom-class'],
  relations: {
    '../ec-tab-bar/index': {
      type: 'parent'
    }
  },
  properties: {
    // 图标
    icon: {
      type: String,
      value: ''
    },
    // 激活时图标
    activeIcon: {
      type: String,
      value: ''
    },
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 徽标内容
    badge: {
      type: String,
      value: ''
    },
    // 是否显示红点
    dot: {
      type: Boolean,
      value: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
    active: false,
    parentData: {}
  },
  lifetimes: {
    attached() {
      const parent = this.getRelationNodes('../ec-tab-bar/index')[0]
      if (parent) {
        this.setData({
          parentData: parent.data
        })
      }
    }
  },
  methods: {
    // 点击事件
    onClick() {
      if (this.data.disabled) return
      
      const index = this._getIndex()
      this.triggerEvent('click', { index })
    },
    
    // 获取索引
    _getIndex() {
      const parent = this.getRelationNodes('../ec-tab-bar/index')[0]
      if (parent) {
        const items = parent.getRelationNodes('../ec-tab-bar-item/index')
        return items.indexOf(this)
      }
      return -1
    }
  }
})
