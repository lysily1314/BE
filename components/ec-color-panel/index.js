Component({
  externalClasses: ['custom-class'],
  properties: {
    // 颜色数据
    colors: {
      type: Array,
      value: []
    },
    // 是否显示颜色名称
    showName: {
      type: Boolean,
      value: true
    },
    // 是否显示颜色值
    showValue: {
      type: Boolean,
      value: true
    },
    // 颜色项大小
    size: {
      type: String,
      value: 'normal' // small, normal, large
    },
    // 排列方向：row | column
    direction: {
      type: String,
      value: 'row'
    }
  },
  data: {
    defaultColors: [
      { name: '主色', value: '#FF4400', desc: '品牌主色调' },
      { name: '成功', value: '#07c160', desc: '成功状态色' },
      { name: '警告', value: '#ff976a', desc: '警告状态色' },
      { name: '危险', value: '#ee0a24', desc: '危险状态色' },
      { name: '信息', value: '#3296fa', desc: '信息状态色' },
      { name: '浅灰', value: '#f7f8fa', desc: '背景色' },
      { name: '边框', value: '#eee', desc: '边框色' },
      { name: '分割线', value: '#f5f5f5', desc: '分割线色' },
      { name: '次要文本', value: '#666', desc: '次要文本色' },
      { name: '正文', value: '#333', desc: '正文文本色' }
    ]
  },
  methods: {
    onClick(e) {
      const { color } = e.currentTarget.dataset;
      this.triggerEvent('click', { color });
    }
  }
})
