Component({
  externalClasses: ['custom-class'],
  properties: {
    // 栅格间隔，单位rpx
    gutter: {
      type: Number,
      value: 0
    },
    // 垂直对齐方式：top | middle | bottom
    align: {
      type: String,
      value: 'top'
    },
    // 水平排列方式：start | end | center | space-around | space-between
    justify: {
      type: String,
      value: 'start'
    }
  },
  data: {
    style: ''
  },
  relations: {
    '../ec-col/index': {
      type: 'child',
      linked() {
        this.setGutter();
      },
      linkChanged() {
        this.setGutter();
      },
      unlinked() {
        this.setGutter();
      }
    }
  },
  observers: {
    gutter() {
      this.setGutter();
    }
  },
  methods: {
    setGutter() {
      const { gutter } = this.properties;
      if (gutter) {
        this.setData({
          style: `margin-left: ${-gutter / 2}rpx; margin-right: ${-gutter / 2}rpx;`
        });

        const colComponents = this.getRelationNodes('../ec-col/index');
        colComponents.forEach(col => {
          col.setGutter(gutter);
        });
      }
    }
  }
})
