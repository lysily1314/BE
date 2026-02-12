Component({
  externalClasses: ['custom-class'],
  properties: {
    // 是否显示抽屉
    show: {
      type: Boolean,
      value: false,
      observer: 'onShowChange'
    },
    // 抽屉位置：left | right | top | bottom
    placement: {
      type: String,
      value: 'right'
    },
    // 抽屉宽度（水平方向时）
    width: {
      type: String,
      value: '80%'
    },
    // 抽屉高度（垂直方向时）
    height: {
      type: String,
      value: '80%'
    },
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      value: true
    },
    // 是否显示遮罩
    showOverlay: {
      type: Boolean,
      value: true
    },
    // 是否允许点击遮罩关闭
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    // 动画持续时间
    duration: {
      type: Number,
      value: 300
    },
    // 圆角大小
    round: {
      type: Boolean,
      value: false
    }
  },
  data: {
    currentShow: false,
    wrapperStyle: '',
    contentStyle: ''
  },
  methods: {
    onShowChange(show) {
      if (show) {
        this.showDrawer();
      } else {
        this.hideDrawer();
      }
    },
    
    showDrawer() {
      this.setData({
        currentShow: true
      });
      
      // 使用 setTimeout 确保 DOM 更新后再添加显示类
      setTimeout(() => {
        this.setData({
          wrapperStyle: 'visibility: visible;',
          contentStyle: this.getContentStyle(true)
        });
      }, 20);
    },
    
    hideDrawer() {
      this.setData({
        contentStyle: this.getContentStyle(false)
      });
      
      // 动画结束后隐藏整个组件
      setTimeout(() => {
        this.setData({
          currentShow: false,
          wrapperStyle: 'visibility: hidden;'
        });
        
        this.triggerEvent('close');
      }, this.properties.duration);
    },
    
    getContentStyle(isShow) {
      const { placement, width, height, duration } = this.properties;
      const translateMap = {
        left: isShow ? `transform: translateX(0);` : `transform: translateX(-100%);`,
        right: isShow ? `transform: translateX(0);` : `transform: translateX(100%);`,
        top: isShow ? `transform: translateY(0);` : `transform: translateY(-100%);`,
        bottom: isShow ? `transform: translateY(0);` : `transform: translateY(100%);`
      };
      
      return `
        ${placement === 'left' || placement === 'right' ? `width: ${width};` : `height: ${height};`}
        ${translateMap[placement]}
        transition: transform ${duration}ms ease;
      `;
    },
    
    onClose() {
      this.setData({
        show: false
      });
    },
    
    onOverlayClick() {
      if (this.properties.closeOnClickOverlay) {
        this.onClose();
      }
    }
  }
})
