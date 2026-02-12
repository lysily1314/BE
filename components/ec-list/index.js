Component({
  externalClasses: ['custom-class'],
  options: {
    multipleSlots: true
  },
  properties: {
    // 是否显示下边框
    border: {
      type: Boolean,
      value: true
    },
    // 是否显示上边框
    borderTop: {
      type: Boolean,
      value: false
    },
    // 是否显示下边框（最后一项）
    borderBottom: {
      type: Boolean,
      value: true
    },
    // 是否启用点击反馈
    clickable: {
      type: Boolean,
      value: false
    }
  },
  relations: {
    '../ec-list-item/index': {
      type: 'child',
      linked() {
        this._updateChildren()
      },
      unlinked() {
        this._updateChildren()
      }
    }
  },
  methods: {
    _updateChildren() {
      this._debounce(() => {
        const items = this.getRelationNodes('../ec-list-item/index')
        const len = items.length
        if (len === 0) return
        
        // 更新每个子项的边框状态
        items.forEach((item, index) => {
          item.updateBorder({
            isLast: index === len - 1,
            showBorder: this.data.border,
            showBorderTop: this.data.borderTop,
            showBorderBottom: this.data.borderBottom
          })
        })
      }, 50)
    },
    _debounce(fn, delay) {
      clearTimeout(this._timer)
      this._timer = setTimeout(fn, delay)
    }
  }
})
