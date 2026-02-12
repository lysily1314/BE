Component({
  externalClasses: ['custom-class'],
  properties: {
    // 是否开启跳转过渡动画
    sticky: {
      type: Boolean,
      value: true
    },
    // 索引是否吸顶
    stickyOffsetTop: {
      type: Number,
      value: 0
    },
    // 是否开启跳转过渡动画
    animation: {
      type: Boolean,
      value: false
    },
    // 索引字符列表
    indexList: {
      type: Array,
      value: []
    }
  },
  data: {
    activeAnchorIndex: -1,
    showSidebar: true,
    scrollTop: 0
  },
  relations: {
    '../ec-index-anchor/index': {
      type: 'child',
      linked(target) {
        this.setRect().then(() => {
          this.updateData();
        });
      },
      unlinked() {
        this.setRect().then(() => {
          this.updateData();
        });
      }
    }
  },
  methods: {
    // 设置组件矩形信息
    setRect() {
      return Promise.all([
        this.getRect('.ec-index-bar'),
        this.getRect('.ec-index-anchor')
      ]).then((res) => {
        this.setData({
          barRect: res[0],
          anchorRect: res[1]
        });
      });
    },
    
    // 更新数据
    updateData() {
      this.setRect().then(() => {
        wx.nextTick(() => {
          this.setData({
            showSidebar: !!this.getAnchorRects().length
          });
          this.onScroll();
        });
      });
    },
    
    // 获取锚点矩形信息
    getAnchorRects() {
      const anchorNodes = this.getRelationNodes('../ec-index-anchor/index');
      return anchorNodes.map((anchor, index) => {
        return anchor.getRect('.ec-index-anchor-wrapper').then((rect) => ({
          rect,
          index,
          anchor: anchor.data.index
        }));
      });
    },
    
    // 滚动处理
    onScroll(scrollTop = 0) {
      this.scrollTop = scrollTop;
      
      if (!this.data.sticky) {
        return;
      }
      
      Promise.all(this.getAnchorRects()).then((rects) => {
        const { scrollTop: currentScrollTop } = this;
        const active = rects.reduce((prev, curr, index) => {
          if (curr.rect.top <= currentScrollTop + this.data.stickyOffsetTop) {
            return index;
          }
          return prev;
        }, -1);
        
        if (active !== -1 && active !== this.data.activeAnchorIndex) {
          this.setData({
            activeAnchorIndex: active
          });
        }
      });
    },
    
    // 滚动到指定索引
    scrollTo(index) {
      const anchorNodes = this.getRelationNodes('../ec-index-anchor/index');
      if (index < 0 || index >= anchorNodes.length || this.data.activeAnchorIndex === index) {
        return;
      }
      
      this.setData({
        activeAnchorIndex: index
      });
      
      anchorNodes[index].scrollIntoView(this.data.animation);
      
      this.triggerEvent('select', {
        index: anchorNodes[index].data.index
      });
    },
    
    // 点击索引
    onClick(event) {
      const { index } = event.currentTarget.dataset;
      this.scrollTo(this.getIndexList().indexOf(index));
    },
    
    // 触摸移动
    onSidebarTouchMove(event) {
      const sidebarLength = this.getAnchorRects().length;
      if (!sidebarLength) {
        return;
      }
      
      const touch = event.touches[0];
      const { pageY } = touch;
      
      // 获取触摸点相对于侧边栏的Y轴偏移量
      const { top, height } = this.data.barRect;
      const index = Math.floor(((pageY - top) / height) * sidebarLength);
      
      if (index >= 0 && index < sidebarLength) {
        this.scrollTo(index);
      }
    },
    
    // 获取索引列表
    getIndexList() {
      if (this.data.indexList.length > 0) {
        return this.data.indexList;
      }
      
      // 默认返回26个字母
      const indexList = [];
      for (let i = 0; i < 26; i++) {
        indexList.push(String.fromCharCode(65 + i));
      }
      return indexList;
    }
  }
})
