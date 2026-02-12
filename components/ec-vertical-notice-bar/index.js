Component({
  externalClasses: ['custom-class'],
  properties: {
    data: {
      type: Array,
      value: []
    },
    height: {
      type: String,
      value: '80rpx'
    },
    speed: {
      type: Number,
      value: 3000
    },
    delay: {
      type: Number,
      value: 2000
    },
    autoScroll: {
      type: Boolean,
      value: true
    },
    pauseOnTouch: {
      type: Boolean,
      value: true
    },
    showIcon: {
      type: Boolean,
      value: true
    },
    defaultIcon: {
      type: String,
      value: 'volume'
    },
    type: {
      type: String,
      value: 'default'
    },
    backgroundColor: {
      type: String,
      value: ''
    },
    textColor: {
      type: String,
      value: ''
    },
    iconColor: {
      type: String,
      value: ''
    },
    fontSize: {
      type: String,
      value: '28rpx'
    },
    lineHeight: {
      type: String,
      value: '1.5'
    },
    padding: {
      type: String,
      value: '0 32rpx'
    },
    borderRadius: {
      type: String,
      value: '0'
    },
    showClose: {
      type: Boolean,
      value: false
    },
    closeable: {
      type: Boolean,
      value: false
    },
    scrollable: {
      type: Boolean,
      value: true
    },
    animationDuration: {
      type: Number,
      value: 500
    }
  },
  data: {
    currentIndex: 0,
    animationData: {},
    isPaused: false,
    isTouching: false,
    show: true,
    itemHeight: 0,
    displayData: []
  },
  lifetimes: {
    ready() {
      this.initComponent()
    },
    detached() {
      this.clearTimers()
    }
  },
  observers: {
    'data': function(newData) {
      if (newData && newData.length > 0) {
        this.setData({
          displayData: newData
        })
        this.initScroll()
      }
    }
  },
  methods: {
    initComponent() {
      const { data } = this.properties
      if (data && data.length > 0) {
        this.setData({
          displayData: data
        })
        this.initScroll()
      }
    },
    initScroll() {
      const { displayData, autoScroll, scrollable, delay } = this.data
      const { speed } = this.properties
      
      if (!scrollable || displayData.length <= 1 || !autoScroll) {
        return
      }
      
      this.clearTimers()
      
      this.queryItemHeight(() => {
        this.startTimer = setTimeout(() => {
          this.startScroll()
        }, delay)
      })
    },
    queryItemHeight(callback) {
      const query = this.createSelectorQuery()
      query.select('.ec-vertical-notice-bar__item').boundingClientRect()
      query.exec((res) => {
        if (res && res[0]) {
          this.setData({
            itemHeight: res[0].height
          })
          callback && callback()
        } else {
          callback && callback()
        }
      })
    },
    startScroll() {
      const { displayData, currentIndex, isPaused, isTouching, itemHeight } = this.data
      const { autoScroll, scrollable, animationDuration } = this.properties
      
      if (!scrollable || displayData.length <= 1 || !autoScroll || isPaused || isTouching) {
        return
      }
      
      const nextIndex = (currentIndex + 1) % displayData.length
      
      this.animation = wx.createAnimation({
        duration: animationDuration,
        timingFunction: 'ease-in-out'
      })
      
      this.animation.translateY(-itemHeight).step()
      
      this.setData({
        animationData: this.animation.export()
      })
      
      this.transitionTimer = setTimeout(() => {
        this.setData({
          currentIndex: nextIndex,
          animationData: {}
        })
        
        this.animation = wx.createAnimation({
          duration: 0,
          timingFunction: 'linear'
        })
        
        this.animation.translateY(0).step()
        
        this.setData({
          animationData: this.animation.export()
        })
        
        this.scrollTimer = setTimeout(() => {
          this.startScroll()
        }, this.properties.speed)
      }, animationDuration)
    },
    onTouchStart(e) {
      const { pauseOnTouch } = this.properties
      if (pauseOnTouch) {
        this.setData({
          isTouching: true
        })
      }
    },
    onTouchMove(e) {
      const { pauseOnTouch } = this.properties
      if (pauseOnTouch) {
        this.setData({
          isTouching: true
        })
      }
    },
    onTouchEnd(e) {
      const { pauseOnTouch } = this.properties
      if (pauseOnTouch) {
        this.setData({
          isTouching: false
        })
        
        const { autoScroll, scrollable } = this.properties
        if (autoScroll && scrollable) {
          this.clearTimers()
          this.scrollTimer = setTimeout(() => {
            this.startScroll()
          }, this.properties.delay)
        }
      }
    },
    onItemClick(e) {
      const { index } = e.currentTarget.dataset
      const item = this.data.displayData[index]
      
      this.triggerEvent('click', {
        index,
        item
      })
      
      if (item && item.url) {
        wx.navigateTo({
          url: item.url,
          fail: () => {
            wx.switchTab({
              url: item.url,
              fail: () => {
                console.warn('无法跳转到:', item.url)
              }
            })
          }
        })
      }
    },
    onIconClick(e) {
      e.stopPropagation()
      this.triggerEvent('iconclick')
    },
    onClose(e) {
      e.stopPropagation()
      this.setData({
        show: false
      })
      this.triggerEvent('close')
    },
    pause() {
      this.setData({
        isPaused: true
      })
      this.clearTimers()
    },
    resume() {
      this.setData({
        isPaused: false
      })
      this.initScroll()
    },
    next() {
      const { displayData, currentIndex, itemHeight } = this.data
      const { animationDuration } = this.properties
      
      if (displayData.length <= 1) {
        return
      }
      
      this.clearTimers()
      
      const nextIndex = (currentIndex + 1) % displayData.length
      
      this.animation = wx.createAnimation({
        duration: animationDuration,
        timingFunction: 'ease-in-out'
      })
      
      this.animation.translateY(-itemHeight).step()
      
      this.setData({
        animationData: this.animation.export()
      })
      
      this.transitionTimer = setTimeout(() => {
        this.setData({
          currentIndex: nextIndex,
          animationData: {}
        })
        
        this.animation = wx.createAnimation({
          duration: 0,
          timingFunction: 'linear'
        })
        
        this.animation.translateY(0).step()
        
        this.setData({
          animationData: this.animation.export()
        })
      }, animationDuration)
    },
    prev() {
      const { displayData, currentIndex, itemHeight } = this.data
      const { animationDuration } = this.properties
      
      if (displayData.length <= 1) {
        return
      }
      
      this.clearTimers()
      
      const prevIndex = (currentIndex - 1 + displayData.length) % displayData.length
      
      this.animation = wx.createAnimation({
        duration: animationDuration,
        timingFunction: 'ease-in-out'
      })
      
      this.animation.translateY(itemHeight).step()
      
      this.setData({
        animationData: this.animation.export()
      })
      
      this.transitionTimer = setTimeout(() => {
        this.setData({
          currentIndex: prevIndex,
          animationData: {}
        })
        
        this.animation = wx.createAnimation({
          duration: 0,
          timingFunction: 'linear'
        })
        
        this.animation.translateY(0).step()
        
        this.setData({
          animationData: this.animation.export()
        })
      }, animationDuration)
    },
    goToIndex(index) {
      const { displayData, currentIndex, itemHeight } = this.data
      const { animationDuration } = this.properties
      
      if (index < 0 || index >= displayData.length || index === currentIndex) {
        return
      }
      
      this.clearTimers()
      
      const direction = index > currentIndex ? -1 : 1
      
      this.animation = wx.createAnimation({
        duration: animationDuration,
        timingFunction: 'ease-in-out'
      })
      
      this.animation.translateY(direction * itemHeight).step()
      
      this.setData({
        animationData: this.animation.export()
      })
      
      this.transitionTimer = setTimeout(() => {
        this.setData({
          currentIndex: index,
          animationData: {}
        })
        
        this.animation = wx.createAnimation({
          duration: 0,
          timingFunction: 'linear'
        })
        
        this.animation.translateY(0).step()
        
        this.setData({
          animationData: this.animation.export()
        })
      }, animationDuration)
    },
    getCurrentIndex() {
      return this.data.currentIndex
    },
    getCurrentItem() {
      const { displayData, currentIndex } = this.data
      return displayData[currentIndex]
    },
    clearTimers() {
      if (this.startTimer) {
        clearTimeout(this.startTimer)
        this.startTimer = null
      }
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer)
        this.scrollTimer = null
      }
      if (this.transitionTimer) {
        clearTimeout(this.transitionTimer)
        this.transitionTimer = null
      }
    },
    reset() {
      this.clearTimers()
      this.setData({
        currentIndex: 0,
        animationData: {},
        isPaused: false,
        isTouching: false
      })
      this.initScroll()
    }
  }
})
