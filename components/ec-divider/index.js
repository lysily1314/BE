Component({
  externalClasses: ['custom-class'],
  properties: {
    // 分割线内容位置：left | center | right
    contentPosition: {
      type: String,
      value: 'center'
    },
    // 分割线颜色
    color: {
      type: String,
      value: '#eee'
    },
    // 分割线厚度，单位rpx
    hairline: {
      type: Boolean,
      value: true
    },
    // 是否使用虚线
    dashed: {
      type: Boolean,
      value: false
    },
    // 文字大小，单位rpx
    fontSize: {
      type: Number,
      value: 24
    },
    // 文字颜色
    textColor: {
      type: String,
      value: '#666'
    },
    // 自定义样式
    customStyle: {
      type: String,
      value: ''
    }
  },
  data: {
    // 内部样式计算
    dividerStyle: '',
    textStyle: ''
  },
  observers: {
    'color, hairline, dashed, fontSize, textColor'() {
      this.updateStyles();
    }
  },
  lifetimes: {
    attached() {
      this.updateStyles();
    }
  },
  methods: {
    updateStyles() {
      const { color, hairline, dashed, fontSize, textColor } = this.properties;
      
      // 计算分割线样式
      let dividerStyle = `border-top-width: ${hairline ? 1 : 2}rpx; `;
      dividerStyle += `border-top-color: ${color}; `;
      dividerStyle += `border-top-style: ${dashed ? 'dashed' : 'solid'}; `;
      
      // 计算文字样式
      let textStyle = `font-size: ${fontSize}rpx; `;
      textStyle += `color: ${textColor}; `;
      
      this.setData({
        dividerStyle,
        textStyle
      });
    }
  }
})
