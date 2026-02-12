Component({
  externalClasses: ['custom-class'],
  relations: {
    '../ec-tab-pane/index': {
      type: 'child',
      linked() {
        this._updateTabs()
      },
      unlinked() {
        this._updateTabs()
      }
    }
  },
  properties: {
    // 当前激活的标签索引
    active: {
      type: Number,
      value: 0
    },
    // 标签类型：line(下划线) | card(卡片)
    type: {
      type: String,
      value: 'line'
    },
    // 标签位置：top | bottom
    position: {
      type: String,
      value: 'top'
    },
    // 是否开启切换动画
    animated: {
      type: Boolean,
      value: true
    },
    // 标签栏是否滚动（标签过多时）
    scrollable: {
      type: Boolean,
      value: false
    },
    // 标签栏背景色
    background: {
      type: String,
      value: ''
    },
    // 标签栏高度
    tabHeight: {
      type: String,
      value: '80rpx'
    },
    // 标签栏颜色
    color: {
      type: String,
      value: ''
    },
    // 激活标签颜色
    activeColor: {
      type: String,
      value: ''
    }
  },
  data: {
    tabs: [],        // 标签列表
    currentIndex: 0, // 当前激活索引
    lineWidth: 0,    // 下划线宽度
    lineLeft: 0,     // 下划线左边距
    scrollLeft: 0    // 滚动位置
  },
  observers: {
    'active': function(val) {
      this.setData({ currentIndex: val })
      this._setLine()
      this._scrollToActiveTab()
    }
  },
  lifetimes: {
    attached() {
      this.setData({ currentIndex: this.data.active })
    },
    ready() {
      this._setLine()
      this._scrollToActiveTab()
    }
  },
  methods: {
    // 更新标签列表
    _updateTabs() {
      const panes = this.getRelationNodes('../ec-tab-pane/index')
      const tabs = panes.map(pane => ({
        title: pane.data.title,
        disabled: pane.data.disabled
      }))
      this.setData({ tabs })
      this._setLine()
    },
    
    // 点击标签
    onTabClick(e) {
      const { index } = e.currentTarget.dataset
      const tab = this.data.tabs[index]
      
      if (tab.disabled) return
      
      this.setData({ currentIndex: index })
      this._setLine()
      this._scrollToActiveTab()
      
      this.triggerEvent('change', { index })
    },
    
    // 设置下划线位置
    _setLine() {
      if (this.data.type !== 'line') return
      
      this.createSelectorQuery()
        .select('.ec-tabs__tab')
        .boundingClientRect(tabRect => {
          if (!tabRect) return
          
          const query = this.createSelectorQuery()
          query.select('.ec-tabs__tabs').boundingClientRect()
          query.selectAll('.ec-tabs__tab').boundingClientRect()
          query.exec(res => {
            if (!res[0] || !res[1]) return
            
            const containerRect = res[0]
            const tabRects = res[1]
            const activeTabRect = tabRects[this.data.currentIndex]
            
            if (!activeTabRect) return
            
            const lineWidth = activeTabRect.width * 0.6
            const lineLeft = activeTabRect.left - containerRect.left + (activeTabRect.width - lineWidth) / 2
            
            this.setData({
              lineWidth,
              lineLeft
            })
          })
        })
        .exec()
    },
    
    // 滚动到激活标签
    _scrollToActiveTab() {
      if (!this.data.scrollable) return
      
      this.createSelectorQuery()
        .select('.ec-tabs__tabs')
        .boundingClientRect(containerRect => {
          if (!containerRect) return
          
          this.createSelectorQuery()
            .selectAll('.ec-tabs__tab')
            .boundingClientRect(tabRects => {
              if (!tabRects || !tabRects[this.data.currentIndex]) return
              
              const activeTabRect = tabRects[this.data.currentIndex]
              const scrollLeft = activeTabRect.left - containerRect.left - (containerRect.width - activeTabRect.width) / 2
              
              this.setData({ scrollLeft: Math.max(0, scrollLeft) })
            })
            .exec()
        })
        .exec()
    }
  }
})
