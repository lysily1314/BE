Component({
  externalClasses: ['custom-class'],
  properties: {
    // 通告栏类型：default | primary | success | warning | danger
    type: {
      type: String,
      value: 'default'
    },
    // 文本内容
    text: {
      type: String,
      value: ''
    },
    // 左侧图标名称
    leftIcon: {
      type: String,
      value: ''
    },
    // 是否开启滚动播放
    scrollable: {
      type: Boolean,
      value: true
    },
    // 是否禁用滚动
    disabled: {
      type: Boolean,
      value: false
    },
    // 是否显示右侧关闭按钮
    closeable: {
      type: Boolean,
      value: false
    },
    // 是否为纯文本展示
    wrapable: {
      type: Boolean,
      value: false
    },
    // 滚动速率 (px/s)
    speed: {
      type: Number,
      value: 50
    },
    // 动画延迟时间 (ms)
    delay: {
      type: Number,
      value: 1000
    }
  },
  data: {
    show: true,
    isScroll: false,
    animationData: {},
    scrollWidth: 0,
    wrapWidth: 0
  },
  ready() {
    if (this.properties.scrollable && !this.properties.disabled && this.properties.text) {
      this.$timer = setTimeout(() => {
        this.initScroll();
      }, this.properties.delay);
    }
  },
  detached() {
    if (this.$timer) {
      clearTimeout(this.$timer);
    }
  },
  methods: {
    initScroll() {
      const { text } = this.properties;
      if (!text) return;

      // 获取文本和容器的宽度
      const query = this.createSelectorQuery();
      query.select('.ec-notice-bar__content').boundingClientRect();
      query.select('.ec-notice-bar__text').boundingClientRect();
      query.exec((res) => {
        if (res && res[0] && res[1]) {
          const wrapWidth = res[0].width;
          const scrollWidth = res[1].width;

          if (scrollWidth > wrapWidth) {
            this.setData({
              isScroll: true,
              scrollWidth,
              wrapWidth
            });

            // 开启动画
            this.startAnimation(scrollWidth, wrapWidth);
          }
        }
      });
    },

    startAnimation(scrollWidth, wrapWidth) {
      const duration = (scrollWidth / this.properties.speed) * 1000;

      this.animation = wx.createAnimation({
        duration,
        timingFunction: 'linear',
        delay: 0
      });

      // 重置位置
      this.animation.translateX(wrapWidth).step();

      this.setData({
        animationData: this.animation.export()
      });

      // 延迟执行动画
      setTimeout(() => {
        if (!this.properties.disabled) {
          this.animation.translateX(-scrollWidth).step();
          this.setData({
            animationData: this.animation.export()
          });
        }
      }, 100);
    },

    onClose() {
      this.setData({
        show: false
      });
      this.triggerEvent('close');
    },

    onClick(event) {
      this.triggerEvent('click', event);
    }
  }
})
