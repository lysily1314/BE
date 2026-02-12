Component({
  externalClasses: ['custom-class'],
  options: {
    multipleSlots: true
  },
  properties: {
    // 轮播图数据
    list: {
      type: Array,
      value: []
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      value: true
    },
    // 自动播放间隔
    interval: {
      type: Number,
      value: 3000
    },
    // 滑动动画时长
    duration: {
      type: Number,
      value: 500
    },
    // 是否循环播放
    circular: {
      type: Boolean,
      value: true
    },
    // 当前显示的索引
    current: {
      type: Number,
      value: 0
    },
    // 指示器位置：bottom | top | none
    indicatorDots: {
      type: String,
      value: 'bottom'
    },
    // 指示器颜色
    indicatorColor: {
      type: String,
      value: 'rgba(0, 0, 0, .3)'
    },
    // 指示器选中颜色
    indicatorActiveColor: {
      type: String,
      value: '#FF4400'
    },
    // 卡片宽度（rpx）
    cardWidth: {
      type: Number,
      value: 540
    },
    // 卡片高度（rpx）
    cardHeight: {
      type: Number,
      value: 300
    },
    // 卡片之间的间距（rpx）
    cardMargin: {
      type: Number,
      value: 20
    },
    // 是否显示卡片阴影
    showShadow: {
      type: Boolean,
      value: true
    },
    // 是否显示卡片圆角
    showRadius: {
      type: Boolean,
      value: true
    },
    // 是否启用滑动切换
    enableSwipe: {
      type: Boolean,
      value: true
    }
  },
  data: {
    currentIndex: 0,
    containerWidth: 0
  },
  lifetimes: {
    attached() {
      this.setData({
        currentIndex: this.properties.current
      });
      this.getContainerWidth();
    }
  },
  methods: {
    getContainerWidth() {
      const query = this.createSelectorQuery();
      query.select('.ec-swiper-card').boundingClientRect((res) => {
        if (res) {
          this.setData({
            containerWidth: res.width
          });
        }
      }).exec();
    },
    
    // 轮播图切换事件
    onChange(e) {
      const { current } = e.detail;
      this.setData({
        currentIndex: current
      });
      
      this.triggerEvent('change', {
        current
      });
    },
    
    // 轮播图触摸开始事件
    onTouchStart(e) {
      if (!this.properties.enableSwipe) {
        e.preventDefault();
        return;
      }
      
      this.triggerEvent('touchstart', e);
    },
    
    // 轮播图触摸移动事件
    onTouchMove(e) {
      if (!this.properties.enableSwipe) {
        e.preventDefault();
        return;
      }
      
      this.triggerEvent('touchmove', e);
    },
    
    // 轮播图触摸结束事件
    onTouchEnd(e) {
      if (!this.properties.enableSwipe) {
        e.preventDefault();
        return;
      }
      
      this.triggerEvent('touchend', e);
    },
    
    // 图片点击事件
    onImageTap(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('imageclick', {
        index,
        item: this.properties.list[index]
      });
    },
    
    // 指示器点击事件
    onIndicatorTap(e) {
      const { index } = e.currentTarget.dataset;
      this.setData({
        currentIndex: index
      });
      
      this.triggerEvent('change', {
        current: index
      });
    }
  }
})
