Component({
  externalClasses: ['custom-class'],
  properties: {
    // 索引字符
    index: {
      type: String,
      value: ''
    }
  },
  data: {
    active: false,
    wrapperStyle: '',
    anchorStyle: ''
  },
  relations: {
    '../ec-index-bar/index': {
      type: 'parent'
    }
  },
  methods: {
    // 滚动到视图
    scrollIntoView(animation) {
      this.getRect('.ec-index-anchor-wrapper').then((rect) => {
        wx.pageScrollTo({
          scrollTop: rect.top + this.getScrollTop(),
          duration: animation ? 300 : 0
        });
      });
    },
    
    // 获取滚动位置
    getScrollTop() {
      return wx.getSystemInfoSync().scrollTop || 0;
    }
  }
})
