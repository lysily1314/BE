Component({
  externalClasses: ['custom-class'],
  relations: {
    '../ec-step/index': {
      type: 'child',
      linked() {
        this._updateSteps()
      },
      unlinked() {
        this._updateSteps()
      }
    }
  },
  properties: {
    // 当前步骤索引
    active: {
      type: Number,
      value: 0,
      observer() {
        this._updateChildActive()
      }
    },
    // 方向：horizontal(横向) | vertical(纵向)
    direction: {
      type: String,
      value: 'horizontal'
    },
    // 激活状态颜色
    activeColor: {
      type: String,
      value: ''
    },
    // 未激活状态颜色
    inactiveColor: {
      type: String,
      value: ''
    },
    // 激活状态图标颜色
    activeIconColor: {
      type: String,
      value: ''
    },
    // 未激活状态图标颜色
    inactiveIconColor: {
      type: String,
      value: ''
    },
    // 是否显示图标
    showIcon: {
      type: Boolean,
      value: true
    }
  },
  data: {
    steps: []
  },
  lifetimes: {
    ready() {
      this._updateSteps()
      this._updateChildActive()
    }
  },
  methods: {
    // 更新步骤列表
    _updateSteps() {
      const items = this.getRelationNodes('../ec-step/index')
      const steps = items.map((item, index) => ({
        index,
        title: item.data.title,
        desc: item.data.desc,
        icon: item.data.icon,
        status: item.data.status
      }))
      this.setData({ steps })
    },
    
    // 更新子组件激活状态
    _updateChildActive() {
      const items = this.getRelationNodes('../ec-step/index')
      items.forEach((item, index) => {
        item.setData({
          index,
          active: index === this.data.active,
          isLast: index === items.length - 1,
          direction: this.data.direction
        })
      })
    }
  }
})
