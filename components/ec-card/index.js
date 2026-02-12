Component({
  externalClasses: ['custom-class'],
  properties: {
    image: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    price: {
      type: null,
      value: ''
    },
    originalPrice: {
      type: null,
      value: ''
    },
    desc: {
      type: String,
      value: ''
    },
    lazyLoad: {
      type: Boolean,
      value: false
    },
    imageMode: {
      type: String,
      value: 'aspectFill'
    }
  },
  methods: {
    onTap() {
      this.triggerEvent('tap')
    },
    onImageLoad() {
      this.triggerEvent('imageload')
    },
    onImageError() {
      this.triggerEvent('imageerror')
    }
  }
})
