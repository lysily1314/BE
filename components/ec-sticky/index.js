// ec-sticky 吸顶容器组件
Component({
  externalClasses: ['custom-class', 'sticky-class'],
  properties: {
    // 吸顶触发阈值，单位rpx
    offsetTop: {
      type: Number,
      value: 0
    },
    // 是否开启吸顶效果
    enabled: {
      type: Boolean,
      value: true
    },
    // 吸顶时的z-index
    zIndex: {
      type: Number,
      value: 99
    },
    // 吸顶时的顶部偏移量，单位rpx
    stickyTop: {
      type: Number,
      value: 0
    }
  },
  data: {
    fixed: false,
    height: 0,
    width: 0,
    offsetTopPx: 0,
    stickyTopPx: 0
  },
  lifetimes: {
    attached() {
      this.init();
      this.startObserve();
    },
    detached() {
      this.stopObserve();
    }
  },
  pageLifetimes: {
    show() {
      this.startObserve();
    },
    hide() {
      this.stopObserve();
    }
  },
  methods: {
    // 初始化组件
    init() {
      this.calculateOffsets();
      this.updateElementSize();
    },
    
    // 计算偏移量（rpx转px）
    calculateOffsets() {
      const systemInfo = wx.getSystemInfoSync();
      const scale = systemInfo.windowWidth / 750;
      
      this.setData({
        offsetTopPx: this.properties.offsetTop * scale,
        stickyTopPx: this.properties.stickyTop * scale
      });
    },
    
    // 更新元素尺寸
    updateElementSize() {
      const query = this.createSelectorQuery();
      query.select('.ec-sticky__content').boundingClientRect((res) => {
        if (res) {
          this.setData({
            height: res.height,
            width: res.width
          });
        }
      }).exec();
    },
    
    // 开始观察滚动
    startObserve() {
      if (this.observer) return;
      
      this.observer = wx.createIntersectionObserver(this, {
        thresholds: [0],
        initialRatio: 0
      });
      
      this.observer.observe('.ec-sticky__anchor', (res) => {
        if (!this.properties.enabled) return;
        
        const shouldFix = res.intersectionRatio <= 0;
        
        if (shouldFix !== this.data.fixed) {
          this.setData({
            fixed: shouldFix
          });
          
          this.triggerEvent('change', {
            fixed: shouldFix
          });
        }
      });
    },
    
    // 停止观察滚动
    stopObserve() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    },
    
    // 手动更新吸顶状态
    updateSticky() {
      this.init();
    }
  }
})
