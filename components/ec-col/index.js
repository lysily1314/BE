Component({
  externalClasses: ['custom-class'],
  properties: {
    // 栅格占位格数
    span: {
      type: Number,
      value: 24
    },
    // 栅格左侧偏移格数
    offset: {
      type: Number,
      value: 0
    },
    // 栅格间隔
    gutter: {
      type: Number,
      value: 0
    }
  },
  data: {
    style: ''
  },
  relations: {
    '../ec-row/index': {
      type: 'parent'
    }
  },
  observers: {
    'span, offset'() {
      this.updateStyle();
    }
  },
  lifetimes: {
    attached() {
      this.updateStyle();
    }
  },
  methods: {
    updateStyle() {
      const { span, offset, gutter } = this.properties;
      let style = '';

      if (gutter) {
        style += `padding-left: ${gutter / 2}rpx; padding-right: ${gutter / 2}rpx; `;
      }

      style += `flex: 0 0 ${(span / 24) * 100}%; `;
      style += `margin-left: ${(offset / 24) * 100}%`;

      this.setData({ style });
    },
    setGutter(gutter) {
      this.setData({ gutter });
      this.updateStyle();
    }
  }
})
