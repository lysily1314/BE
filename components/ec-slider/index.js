Component({
  externalClasses: ['custom-class'],
  properties: {
    // 当前值
    value: {
      type: Number,
      value: 0
    },
    // 最小值
    min: {
      type: Number,
      value: 0
    },
    // 最大值
    max: {
      type: Number,
      value: 100
    },
    // 步长
    step: {
      type: Number,
      value: 1
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    },
    // 滑块颜色
    activeColor: {
      type: String,
      value: '#FF4400'
    },
    // 轨道颜色
    inactiveColor: {
      type: String,
      value: '#e5e5e5'
    },
    // 滑块大小
    blockSize: {
      type: Number,
      value: 20
    },
    // 滑块颜色
    blockColor: {
      type: String,
      value: '#ffffff'
    }
  },
  methods: {
    // 滑块值改变事件
    onSliderChange(e) {
      this.triggerEvent('change', {
        value: e.detail.value
      });
    },
    
    // 滑块拖动开始事件
    onSliderChanging(e) {
      this.triggerEvent('changing', {
        value: e.detail.value
      });
    }
  }
})
