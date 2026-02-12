Component({
  externalClasses: ['custom-class'],
  properties: {
    type: {
      type: String,
      value: 'bar'
    },
    data: {
      type: Array,
      value: []
    },
    width: {
      type: String,
      value: '100%'
    },
    height: {
      type: String,
      value: '400rpx'
    },
    colors: {
      type: Array,
      value: ['#FF4400', '#07c160', '#1989fa', '#ff976a', '#ee0a24', '#7232dd']
    },
    showLegend: {
      type: Boolean,
      value: true
    },
    legendPosition: {
      type: String,
      value: 'bottom'
    },
    showTooltip: {
      type: Boolean,
      value: true
    },
    animation: {
      type: Boolean,
      value: true
    },
    animationDuration: {
      type: Number,
      value: 1000
    },
    padding: {
      type: Object,
      value: { top: 40, right: 40, bottom: 60, left: 60 }
    },
    axisColor: {
      type: String,
      value: '#ebedf0'
    },
    axisLabelColor: {
      type: String,
      value: '#969799'
    },
    gridColor: {
      type: String,
      value: '#f7f8fa'
    },
    textColor: {
      type: String,
      value: '#323233'
    },
    fontSize: {
      type: Number,
      value: 12
    },
    lineWidth: {
      type: Number,
      value: 2
    },
    barWidth: {
      type: Number,
      value: 40
    },
    pointRadius: {
      type: Number,
      value: 4
    },
    enableTouch: {
      type: Boolean,
      value: true
    },
    enableZoom: {
      type: Boolean,
      value: false
    },
    min: {
      type: Number,
      value: null
    },
    max: {
      type: Number,
      value: null
    },
    showValue: {
      type: Boolean,
      value: false
    },
    valuePosition: {
      type: String,
      value: 'top'
    },
    smooth: {
      type: Boolean,
      value: false
    },
    area: {
      type: Boolean,
      value: false
    },
    areaColor: {
      type: String,
      value: 'rgba(25, 137, 250, 0.1)'
    },
    doughnutRadius: {
      type: Number,
      value: 0.6
    }
  },
  data: {
    canvasId: 'ecChartCanvas',
    canvasWidth: 0,
    canvasHeight: 0,
    pixelRatio: 1,
    tooltip: {
      show: false,
      x: 0,
      y: 0,
      data: null
    },
    animationProgress: 0,
    isAnimating: false
  },
  lifetimes: {
    ready() {
      this.initAnimationPolyfill()
      this.initChart()
    },
    detached() {
      this.clearAnimation()
    }
  },
  observers: {
    'data, type': function() {
      if (this._rafReady) {
        this.initChart()
      }
    }
  },
  methods: {
    initAnimationPolyfill() {
      if (this._rafReady) return
      
      const global = typeof globalThis !== 'undefined' ? globalThis : 
                   typeof window !== 'undefined' ? window : 
                   typeof global !== 'undefined' ? global : this
      
      let raf = global.requestAnimationFrame
      let caf = global.cancelAnimationFrame
      
      if (typeof raf === 'function' && typeof caf === 'function') {
        this.requestAnimationFrame = raf.bind(global)
        this.cancelAnimationFrame = caf.bind(global)
        this._rafReady = true
        return
      }
      
      const vendors = ['ms', 'moz', 'webkit', 'o']
      
      for (let i = 0; i < vendors.length; i++) {
        const vendor = vendors[i]
        const rafName = vendor + 'RequestAnimationFrame'
        const cafName = vendor + 'CancelAnimationFrame' || vendor + 'CancelRequestAnimationFrame'
        
        if (global[rafName] && global[cafName]) {
          this.requestAnimationFrame = global[rafName].bind(global)
          this.cancelAnimationFrame = global[cafName].bind(global)
          this._rafReady = true
          return
        }
      }
      
      let lastTime = 0
      const targetFPS = 60
      const frameInterval = 1000 / targetFPS
      
      this.requestAnimationFrame = (callback) => {
        const currentTime = Date.now()
        const elapsed = currentTime - lastTime
        
        if (elapsed > frameInterval) {
          lastTime = currentTime - (elapsed % frameInterval)
          return setTimeout(() => {
            callback(currentTime)
          }, 0)
        } else {
          return setTimeout(() => {
            const nextTime = Date.now()
            lastTime = nextTime
            callback(nextTime)
          }, frameInterval - elapsed)
        }
      }
      
      this.cancelAnimationFrame = (id) => {
        clearTimeout(id)
      }
      
      this._rafReady = true
    },
    initChart() {
      const query = this.createSelectorQuery()
      query.select('#ecChartCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res || !res[0]) return
          
          const { node, width, height } = res[0]
          const canvas = node
          const ctx = canvas.getContext('2d')
          
          const pixelRatio = wx.getSystemInfoSync().pixelRatio
          canvas.width = width * pixelRatio
          canvas.height = height * pixelRatio
          ctx.scale(pixelRatio, pixelRatio)
          
          this.setData({
            canvasWidth: width,
            canvasHeight: height,
            pixelRatio,
            canvas,
            ctx
          })
          
          this.startAnimation()
        })
    },
    startAnimation() {
      if (!this.properties.animation) {
        this.setData({ animationProgress: 1 })
        this.draw()
        return
      }
      
      this.clearAnimation()
      this.setData({ isAnimating: true, animationProgress: 0 })
      
      const startTime = Date.now()
      const duration = this.properties.animationDuration
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        const easeProgress = this.easeOutCubic(progress)
        
        this.setData({ animationProgress: easeProgress })
        this.draw()
        
        if (progress < 1) {
          this.animationFrame = this.requestAnimationFrame(animate)
        } else {
          this.setData({ isAnimating: false })
        }
      }
      
      this.animationFrame = this.requestAnimationFrame(animate)
    },
    easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3)
    },
    draw() {
      const { ctx, canvasWidth, canvasHeight, animationProgress } = this.data
      const { type, data, padding, axisColor, axisLabelColor, gridColor } = this.properties
      
      if (!ctx || !data || data.length === 0) return
      
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      
      const chartArea = {
        x: padding.left,
        y: padding.top,
        width: canvasWidth - padding.left - padding.right,
        height: canvasHeight - padding.top - padding.bottom
      }
      
      switch (type) {
        case 'bar':
          this.drawBarChart(ctx, chartArea, animationProgress)
          break
        case 'line':
          this.drawLineChart(ctx, chartArea, animationProgress)
          break
        case 'pie':
          this.drawPieChart(ctx, chartArea, animationProgress)
          break
        case 'doughnut':
          this.drawDoughnutChart(ctx, chartArea, animationProgress)
          break
      }
      
      if (this.properties.showLegend) {
        this.drawLegend(ctx, chartArea)
      }
    },
    drawBarChart(ctx, chartArea, progress) {
      const { data, colors, barWidth, axisColor, axisLabelColor, gridColor, textColor, fontSize, showValue, valuePosition } = this.properties
      
      const maxValue = this.properties.max || Math.max(...data.map(item => item.value))
      const minValue = this.properties.min || 0
      const valueRange = maxValue - minValue
      
      const barCount = data.length
      const barSpacing = (chartArea.width - barCount * barWidth) / (barCount + 1)
      
      ctx.font = `${fontSize}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      data.forEach((item, index) => {
        const x = chartArea.x + barSpacing + index * (barWidth + barSpacing)
        const barHeight = ((item.value - minValue) / valueRange) * chartArea.height * progress
        const y = chartArea.y + chartArea.height - barHeight
        
        const color = colors[index % colors.length]
        
        ctx.fillStyle = color
        ctx.fillRect(x, y, barWidth, barHeight)
        
        if (showValue) {
          ctx.fillStyle = textColor
          const valueY = valuePosition === 'top' ? y - 10 : y + barHeight + 10
          ctx.fillText(item.value.toString(), x + barWidth / 2, valueY)
        }
        
        ctx.fillStyle = axisLabelColor
        ctx.fillText(item.label, x + barWidth / 2, chartArea.y + chartArea.height + 20)
      })
      
      this.drawAxes(ctx, chartArea, axisColor, gridColor)
    },
    drawLineChart(ctx, chartArea, progress) {
      const { data, colors, lineWidth, pointRadius, axisColor, axisLabelColor, gridColor, textColor, fontSize, smooth, area, areaColor, showValue, valuePosition } = this.properties
      
      const maxValue = this.properties.max || Math.max(...data.map(item => item.value))
      const minValue = this.properties.min || 0
      const valueRange = maxValue - minValue
      
      const pointCount = data.length
      const pointSpacing = chartArea.width / (pointCount - 1 || 1)
      
      ctx.font = `${fontSize}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      const points = data.map((item, index) => ({
        x: chartArea.x + index * pointSpacing,
        y: chartArea.y + chartArea.height - ((item.value - minValue) / valueRange) * chartArea.height * progress,
        value: item.value,
        label: item.label
      }))
      
      if (area && points.length > 1) {
        ctx.beginPath()
        ctx.moveTo(points[0].x, chartArea.y + chartArea.height)
        
        if (smooth) {
          this.drawSmoothLine(ctx, points, true)
        } else {
          points.forEach(point => ctx.lineTo(point.x, point.y))
        }
        
        ctx.lineTo(points[points.length - 1].x, chartArea.y + chartArea.height)
        ctx.closePath()
        ctx.fillStyle = areaColor
        ctx.fill()
      }
      
      ctx.beginPath()
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      if (smooth) {
        this.drawSmoothLine(ctx, points, false)
      } else {
        points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            ctx.lineTo(point.x, point.y)
          }
        })
      }
      
      ctx.stroke()
      
      points.forEach((point, index) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2)
        ctx.fillStyle = colors[0]
        ctx.fill()
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2
        ctx.stroke()
        
        if (showValue) {
          ctx.fillStyle = textColor
          const valueY = valuePosition === 'top' ? point.y - 15 : point.y + 15
          ctx.fillText(point.value.toString(), point.x, valueY)
        }
        
        ctx.fillStyle = axisLabelColor
        ctx.fillText(point.label, point.x, chartArea.y + chartArea.height + 20)
      })
      
      this.drawAxes(ctx, chartArea, axisColor, gridColor)
    },
    drawSmoothLine(ctx, points, closePath) {
      if (points.length < 2) return
      
      ctx.moveTo(points[0].x, points[0].y)
      
      for (let i = 0; i < points.length - 1; i++) {
        const x_mid = (points[i].x + points[i + 1].x) / 2
        const y_mid = (points[i].y + points[i + 1].y) / 2
        const cp_x1 = (x_mid + points[i].x) / 2
        const cp_x2 = (x_mid + points[i + 1].x) / 2
        
        ctx.quadraticCurveTo(points[i].x, points[i].y, x_mid, y_mid)
        ctx.quadraticCurveTo(points[i + 1].x, points[i + 1].y, points[i + 1].x, points[i + 1].y)
      }
      
      if (closePath) {
        ctx.lineTo(points[points.length - 1].x, chartArea.y + chartArea.height)
      }
    },
    drawPieChart(ctx, chartArea, progress) {
      const { data, colors, textColor, fontSize } = this.properties
      
      const centerX = chartArea.x + chartArea.width / 2
      const centerY = chartArea.y + chartArea.height / 2
      const radius = Math.min(chartArea.width, chartArea.height) / 2 * progress
      
      const total = data.reduce((sum, item) => sum + item.value, 0)
      
      let startAngle = -Math.PI / 2
      
      ctx.font = `${fontSize}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * Math.PI * 2
        const endAngle = startAngle + sliceAngle
        
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, endAngle)
        ctx.closePath()
        
        ctx.fillStyle = colors[index % colors.length]
        ctx.fill()
        
        const midAngle = startAngle + sliceAngle / 2
        const labelRadius = radius * 0.7
        const labelX = centerX + Math.cos(midAngle) * labelRadius
        const labelY = centerY + Math.sin(midAngle) * labelRadius
        
        ctx.fillStyle = textColor
        ctx.fillText(item.label, labelX, labelY)
        
        startAngle = endAngle
      })
    },
    drawDoughnutChart(ctx, chartArea, progress) {
      const { data, colors, textColor, fontSize, doughnutRadius } = this.properties
      
      const centerX = chartArea.x + chartArea.width / 2
      const centerY = chartArea.y + chartArea.height / 2
      const outerRadius = Math.min(chartArea.width, chartArea.height) / 2 * progress
      const innerRadius = outerRadius * doughnutRadius
      
      const total = data.reduce((sum, item) => sum + item.value, 0)
      
      let startAngle = -Math.PI / 2
      
      ctx.font = `${fontSize}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * Math.PI * 2
        const endAngle = startAngle + sliceAngle
        
        ctx.beginPath()
        ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle)
        ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true)
        ctx.closePath()
        
        ctx.fillStyle = colors[index % colors.length]
        ctx.fill()
        
        const midAngle = startAngle + sliceAngle / 2
        const labelRadius = (outerRadius + innerRadius) / 2
        const labelX = centerX + Math.cos(midAngle) * labelRadius
        const labelY = centerY + Math.sin(midAngle) * labelRadius
        
        ctx.fillStyle = textColor
        ctx.fillText(item.label, labelX, labelY)
        
        startAngle = endAngle
      })
      
      ctx.beginPath()
      ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2)
      ctx.fillStyle = '#fff'
      ctx.fill()
    },
    drawAxes(ctx, chartArea, axisColor, gridColor) {
      ctx.beginPath()
      ctx.strokeStyle = axisColor
      ctx.lineWidth = 1
      
      ctx.moveTo(chartArea.x, chartArea.y)
      ctx.lineTo(chartArea.x, chartArea.y + chartArea.height)
      ctx.lineTo(chartArea.x + chartArea.width, chartArea.y + chartArea.height)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.strokeStyle = gridColor
      ctx.setLineDash([5, 5])
      
      for (let i = 1; i <= 5; i++) {
        const y = chartArea.y + (chartArea.height / 5) * i
        ctx.moveTo(chartArea.x, y)
        ctx.lineTo(chartArea.x + chartArea.width, y)
      }
      
      ctx.stroke()
      ctx.setLineDash([])
    },
    drawLegend(ctx, chartArea) {
      const { data, colors, legendPosition, fontSize, textColor } = this.properties
      
      ctx.font = `${fontSize}px sans-serif`
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      
      const legendItemWidth = 80
      const legendItemHeight = 20
      const legendSpacing = 10
      
      let startX, startY
      
      if (legendPosition === 'top') {
        startX = chartArea.x
        startY = 10
      } else {
        startX = chartArea.x
        startY = chartArea.y + chartArea.height + 30
      }
      
      data.forEach((item, index) => {
        const x = startX + (index % 3) * (legendItemWidth + legendSpacing)
        const y = startY + Math.floor(index / 3) * (legendItemHeight + 10)
        
        ctx.fillStyle = colors[index % colors.length]
        ctx.fillRect(x, y, 12, 12)
        
        ctx.fillStyle = textColor
        ctx.fillText(item.label, x + 18, y + 6)
      })
    },
    onTouchStart(e) {
      if (!this.properties.enableTouch) return
      
      const touch = e.touches[0]
      this.handleTouch(touch.x, touch.y)
    },
    onTouchMove(e) {
      if (!this.properties.enableTouch) return
      
      const touch = e.touches[0]
      this.handleTouch(touch.x, touch.y)
    },
    onTouchEnd(e) {
      this.setData({
        'tooltip.show': false
      })
    },
    handleTouch(x, y) {
      const { data, type, showTooltip, padding } = this.properties
      
      if (!showTooltip) return
      
      let found = false
      
      if (type === 'bar' || type === 'line') {
        const chartArea = {
          x: padding.left,
          y: padding.top,
          width: this.data.canvasWidth - padding.left - padding.right,
          height: this.data.canvasHeight - padding.top - padding.bottom
        }
        
        const pointCount = data.length
        const pointSpacing = chartArea.width / (pointCount - 1 || 1)
        
        data.forEach((item, index) => {
          const pointX = chartArea.x + index * pointSpacing
          
          if (Math.abs(x - pointX) < pointSpacing / 2) {
            this.setData({
              tooltip: {
                show: true,
                x: pointX,
                y: y,
                data: item
              }
            })
            found = true
          }
        })
      }
      
      if (!found) {
        this.setData({
          'tooltip.show': false
        })
      }
    },
    clearAnimation() {
      if (this.animationFrame) {
        this.cancelAnimationFrame(this.animationFrame)
        this.animationFrame = null
      }
    },
    refresh() {
      this.startAnimation()
    },
    exportImage() {
      const { canvas } = this.data
      if (!canvas) return Promise.reject('Canvas not initialized')
      
      return new Promise((resolve, reject) => {
        wx.canvasToTempFilePath({
          canvas,
          success: resolve,
          fail: reject
        })
      })
    }
  }
})
