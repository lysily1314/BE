Component({
  externalClasses: ['custom-class'],
  properties: {
    value: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '请输入'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    readonly: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: Number,
      value: 200
    },
    showCount: {
      type: Boolean,
      value: false
    },
    autoHeight: {
      type: Boolean,
      value: false
    },
    rows: {
      type: Number,
      value: 3
    },
    border: {
      type: Boolean,
      value: true
    }
  },
  data: {
    focused: false,
    innerValue: ''
  },
  observers: {
    'value': function(val) {
      this.setData({ innerValue: val })
    }
  },
  lifetimes: {
    attached() {
      this.setData({ innerValue: this.data.value })
    }
  },
  methods: {
    onInput(e) {
      const value = e.detail.value
      this.setData({ innerValue: value })
      this.triggerEvent('change', { value })
    },
    onFocus(e) {
      this.setData({ focused: true })
      this.triggerEvent('focus', e.detail)
    },
    onBlur(e) {
      this.setData({ focused: false })
      this.triggerEvent('blur', e.detail)
    },
    onConfirm(e) {
      this.triggerEvent('confirm', e.detail)
    }
  }
})
