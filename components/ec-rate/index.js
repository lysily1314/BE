Component({
  externalClasses: ['custom-class'],
  properties: {
    value: {
      type: Number,
      value: 0
    },
    count: {
      type: Number,
      value: 5
    },
    size: {
      type: String,
      value: '36rpx'
    },
    color: {
      type: String,
      value: '#FF976A'
    },
    voidColor: {
      type: String,
      value: '#C8C9CC'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    readonly: {
      type: Boolean,
      value: false
    },
    allowHalf: {
      type: Boolean,
      value: false
    },
    touchable: {
      type: Boolean,
      value: true
    }
  },
  data: {
    innerValue: 0,
    ranges: []
  },
  observers: {
    'value': function(val) {
      this.setData({ innerValue: val })
    }
  },
  lifetimes: {
    attached() {
      this.setData({ innerValue: this.data.value })
      this._initRanges()
    }
  },
  methods: {
    _initRanges() {
      const ranges = []
      const size = parseFloat(this.data.size)
      for (let i = 0; i < this.data.count; i++) {
        ranges.push({
          left: i * (size + 4),
          right: (i + 1) * (size + 4)
        })
      }
      this.setData({ ranges })
    },
    onTap(e) {
      if (this.data.disabled || this.data.readonly) return
      const { index } = e.currentTarget.dataset
      let value = index + 1
      if (this.data.allowHalf) {
        const clientX = e.touches ? e.touches[0].clientX : e.detail.x
        const rect = wx.createSelectorQuery().in(this).select('.ec-rate').boundingClientRect()
        rect.boundingClientRect(res => {
          if (res) {
            const relativeX = clientX - res.left
            const size = parseFloat(this.data.size)
            const itemWidth = size + 4
            const inRightHalf = (relativeX % itemWidth) > (size / 2)
            value = index + (inRightHalf ? 1 : 0.5)
            this.setData({ innerValue: value })
            this.triggerEvent('change', { value })
          }
        }).exec()
      } else {
        this.setData({ innerValue: value })
        this.triggerEvent('change', { value })
      }
    }
  }
})
