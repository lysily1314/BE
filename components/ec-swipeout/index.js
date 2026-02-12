Component({
  externalClasses: ['custom-class'],
  options: {
    multipleSlots: true
  },
  properties: {
    // 是否禁用滑动
    disabled: {
      type: Boolean,
      value: false
    },
    // 是否自动关闭其他swipeout（配合group使用）
    autoClose: {
      type: Boolean,
      value: true
    },
    // 滑动门限，超过这个比例认为是要打开菜单
    threshold: {
      type: Number,
      value: 0.5
    },
    // 右侧操作按钮数组
    rightActions: {
      type: Array,
      value: []
    },
    // 左侧操作按钮数组
    leftActions: {
      type: Array,
      value: []
    }
  },
  data: {
    // 滑动距离（rpx）
    translateX: 0,
    // 是否正在拖拽
    dragging: false,
    // 按钮宽度（rpx）
    rightWidth: 0,
    leftWidth: 0
  },
  lifetimes: {
    attached() {
      this.calculateButtonsWidth();
    },
    ready() {
      this.calculateButtonsWidth();
    }
  },
  methods: {
    // 计算按钮宽度
    calculateButtonsWidth() {
      // 获取右侧按钮宽度
      if (this.properties.rightActions.length > 0) {
        const rightBtns = this.properties.rightActions;
        let rightWidth = 0;
        rightBtns.forEach(btn => {
          rightWidth += btn.width || 80;
        });
        this.setData({ rightWidth });
      }
      
      // 获取左侧按钮宽度
      if (this.properties.leftActions.length > 0) {
        const leftBtns = this.properties.leftActions;
        let leftWidth = 0;
        leftBtns.forEach(btn => {
          leftWidth += btn.width || 80;
        });
        this.setData({ leftWidth });
      }
    },
    
    // 开始触摸
    onTouchStart(event) {
      if (this.properties.disabled) return;
      
      const touch = event.touches[0];
      this.startX = touch.pageX;
      this.startTranslateX = this.data.translateX;
      this.setData({
        dragging: true
      });
    },
    
    // 触摸移动
    onTouchMove(event) {
      if (this.properties.disabled || !this.startX) return;
      
      const touch = event.touches[0];
      const deltaX = touch.pageX - this.startX;
      
      // 转换像素到rpx
      const systemInfo = wx.getSystemInfoSync();
      const scale = 750 / systemInfo.windowWidth;
      const deltaXRpx = deltaX * scale;
      
      let translateX = this.startTranslateX + deltaXRpx;
      
      const { rightWidth, leftWidth } = this.data;
      
      // 限制滑动范围
      if (translateX > 0) {
        // 向右滑动，显示左侧按钮
        translateX = Math.min(translateX, leftWidth);
      } else if (translateX < 0) {
        // 向左滑动，显示右侧按钮
        translateX = Math.max(translateX, -rightWidth);
      }
      
      this.setData({
        translateX
      });
    },
    
    // 触摸结束
    onTouchEnd() {
      if (this.properties.disabled) return;
      
      this.handleTouchEnd();
    },
    
    // 触摸取消
    onTouchCancel() {
      if (this.properties.disabled) return;
      
      this.handleTouchEnd();
    },
    
    // 处理触摸结束
    handleTouchEnd() {
      const { translateX, rightWidth, leftWidth } = this.data;
      const { threshold } = this.properties;
      let newTranslateX = 0;
      
      // 根据滑动距离和阈值判断是否打开菜单
      if (translateX > 0 && leftWidth > 0) {
        // 左侧菜单
        newTranslateX = translateX > leftWidth * threshold ? leftWidth : 0;
      } else if (translateX < 0 && rightWidth > 0) {
        // 右侧菜单
        newTranslateX = Math.abs(translateX) > rightWidth * threshold ? -rightWidth : 0;
      }
      
      this.setData({
        translateX: newTranslateX,
        dragging: false
      });
      
      // 重置起始点
      this.startX = null;
      this.startTranslateX = 0;
    },
    
    // 关闭菜单
    closeSwipe() {
      this.setData({
        translateX: 0
      });
    },
    
    // 打开右侧菜单
    openRightMenu() {
      if (this.data.rightWidth > 0) {
        this.setData({
          translateX: -this.data.rightWidth
        });
      }
    },
    
    // 打开左侧菜单
    openLeftMenu() {
      if (this.data.leftWidth > 0) {
        this.setData({
          translateX: this.data.leftWidth
        });
      }
    },
    
    // 点击右侧按钮
    onRightButtonClick(e) {
      const index = e.currentTarget.dataset.index;
      const action = this.properties.rightActions[index];
      
      if (action) {
        this.triggerEvent('action', {
          index,
          name: action.name,
          action,
          position: 'right'
        });
        
        // 如果按钮设置了closeOnAction，则关闭菜单
        if (action.closeOnAction !== false) {
          this.closeSwipe();
        }
      }
    },
    
    // 点击左侧按钮
    onLeftButtonClick(e) {
      const index = e.currentTarget.dataset.index;
      const action = this.properties.leftActions[index];
      
      if (action) {
        this.triggerEvent('action', {
          index,
          name: action.name,
          action,
          position: 'left'
        });
        
        // 如果按钮设置了closeOnAction，则关闭菜单
        if (action.closeOnAction !== false) {
          this.closeSwipe();
        }
      }
    },
    
    // 点击内容区域
    onContentClick() {
      // 如果当前是展开状态，则关闭
      if (this.data.translateX !== 0) {
        this.closeSwipe();
      }
    }
  }
})
