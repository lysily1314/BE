Component({
  externalClasses: ['custom-class'],
  properties: {
    type: {
      type: String,
      value: 'default' // primary | default | text
    },
    size: {
      type: String,
      value: 'medium' // large | medium | small
    },
    block: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false
    },
    round: {
      type: Boolean,
      value: false
    },
    plain: {
      type: Boolean,
      value: false
    },
    icon: {
      type: String,
      value: ''
    }
  },
  methods: {
    onTap() {
      if (this.data.disabled || this.data.loading) return
      this.triggerEvent('tap')
    }
  }
})
