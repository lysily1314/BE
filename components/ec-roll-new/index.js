Component({
  externalClasses: ['custom-class'],
  properties: {
    direction: {
      type: String,
      value: 'vertical'
    },
    scrollX: {
      type: Boolean,
      value: false
    },
    scrollY: {
      type: Boolean,
      value: true
    },
    scrollTop: {
      type: Number,
      value: 0
    },
    scrollLeft: {
      type: Number,
      value: 0
    },
    scrollIntoView: {
      type: String,
      value: ''
    },
    scrollWithAnimation: {
      type: Boolean,
      value: false
    },
    enableFlex: {
      type: Boolean,
      value: false
    },
    enableBackToTop: {
      type: Boolean,
      value: false
    },
    enhanced: {
      type: Boolean,
      value: false
    },
    bounces: {
      type: Boolean,
      value: true
    },
    showScrollbar: {
      type: Boolean,
      value: true
    },
    pagingEnabled: {
      type: Boolean,
      value: false
    },
    fastDeceleration: {
      type: Boolean,
      value: false
    },
    lowerThreshold: {
      type: Number,
      value: 50
    },
    upperThreshold: {
      type: Number,
      value: 50
    },
    scrollAnimationDuration: {
      type: Number,
      value: 300
    },
    throttle: {
      type: Boolean,
      value: false
    },
    height: {
      type: String,
      value: '100%'
    },
    width: {
      type: String,
      value: '100%'
    },
    maxHeight: {
      type: String,
      value: ''
    },
    maxWidth: {
      type: String,
      value: ''
    }
  },
  data: {
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    isScrolling: false,
    scrollStartTime: 0
  },
  lifetimes: {
    ready() {
      this.initScroll()
    },
    detached() {
      this.clearScrollTimer()
    }
  },
  observers: {
    'scrollX, scrollY': function(scrollX, scrollY) {
      if (scrollX && !scrollY) {
        this.setData({ direction: 'horizontal' })
      } else if (!scrollX && scrollY) {
        this.setData({ direction: 'vertical' })
      }
    }
  },
  methods: {
    initScroll() {
      this.queryScrollSize()
    },
    queryScrollSize() {
      const query = this.createSelectorQuery()
      query.select('.ec-roll-new__scroll').boundingClientRect()
      query.exec((res) => {
        if (res && res[0]) {
          this.setData({
            scrollHeight: res[0].height,
            scrollWidth: res[0].width
          })
        }
      })
    },
    onScroll(e) {
      const { scrollTop, scrollLeft, scrollHeight, scrollWidth, deltaWidth, deltaHeight } = e.detail
      const currentTime = Date.now()
      
      if (!this.data.isScrolling) {
        this.setData({
          isScrolling: true,
          scrollStartTime: currentTime
        })
        this.triggerEvent('scrollstart', {
          scrollTop,
          scrollLeft,
          scrollHeight,
          scrollWidth
        })
      }
      
      this.setData({
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth
      })
      
      this.triggerEvent('scroll', {
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth,
        deltaWidth,
        deltaHeight
      })
      
      this.clearScrollTimer()
      this.scrollTimer = setTimeout(() => {
        this.setData({
          isScrolling: false
        })
        this.triggerEvent('scrollend', {
          scrollTop,
          scrollLeft,
          scrollHeight,
          scrollWidth
        })
      }, 100)
    },
    onScrollToUpper(e) {
      this.triggerEvent('scrolltoupper', {
        direction: this.properties.direction,
        scrollTop: this.data.scrollTop,
        scrollLeft: this.data.scrollLeft
      })
    },
    onScrollToLower(e) {
      this.triggerEvent('scrolltolower', {
        direction: this.properties.direction,
        scrollTop: this.data.scrollTop,
        scrollLeft: this.data.scrollLeft
      })
    },
    scrollTo(options) {
      const { top = 0, left = 0, duration = this.properties.scrollAnimationDuration } = options || {}
      
      if (this.properties.direction === 'horizontal') {
        this.setData({
          scrollLeft: left
        })
      } else {
        this.setData({
          scrollTop: top
        })
      }
      
      if (duration > 0) {
        setTimeout(() => {
          this.triggerEvent('scrollto', {
            top,
            left,
            duration
          })
        }, duration)
      }
    },
    scrollBy(options) {
      const { top = 0, left = 0, duration = this.properties.scrollAnimationDuration } = options || {}
      
      let newScrollTop = this.data.scrollTop + top
      let newScrollLeft = this.data.scrollLeft + left
      
      if (this.properties.direction === 'horizontal') {
        this.setData({
          scrollLeft: Math.max(0, newScrollLeft)
        })
      } else {
        this.setData({
          scrollTop: Math.max(0, newScrollTop)
        })
      }
      
      if (duration > 0) {
        setTimeout(() => {
          this.triggerEvent('scrollby', {
            top,
            left,
            duration
          })
        }, duration)
      }
    },
    scrollToTop(duration) {
      const animDuration = duration !== undefined ? duration : this.properties.scrollAnimationDuration
      this.scrollTo({
        top: 0,
        left: 0,
        duration: animDuration
      })
    },
    scrollToBottom(duration) {
      const animDuration = duration !== undefined ? duration : this.properties.scrollAnimationDuration
      const query = this.createSelectorQuery()
      query.select('.ec-roll-new__content').boundingClientRect()
      query.exec((res) => {
        if (res && res[0]) {
          const contentHeight = res[0].height
          this.scrollTo({
            top: contentHeight,
            duration: animDuration
          })
        }
      })
    },
    scrollToElement(selector, duration) {
      const animDuration = duration !== undefined ? duration : this.properties.scrollAnimationDuration
      const query = this.createSelectorQuery()
      query.select(selector).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec((res) => {
        if (res && res[0] && res[1]) {
          const { top, left } = res[0]
          const { scrollTop, scrollLeft } = res[1]
          
          if (this.properties.direction === 'horizontal') {
            this.scrollTo({
              left: left + scrollLeft,
              duration: animDuration
            })
          } else {
            this.scrollTo({
              top: top + scrollTop,
              duration: animDuration
            })
          }
        }
      })
    },
    getScrollPosition() {
      return {
        scrollTop: this.data.scrollTop,
        scrollLeft: this.data.scrollLeft,
        scrollHeight: this.data.scrollHeight,
        scrollWidth: this.data.scrollWidth
      }
    },
    refresh() {
      this.queryScrollSize()
      this.triggerEvent('refresh')
    },
    clearScrollTimer() {
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer)
        this.scrollTimer = null
      }
    }
  }
})
