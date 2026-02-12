Component({
  externalClasses: ['custom-class'],
  properties: {
    value: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '请输入'
    },
    type: {
      type: String,
      value: 'text' // text | number | digit | idcard | password
    },
    disabled: {
      type: Boolean,
      value: false
    },
    readonly: {
      type: Boolean,
      value: false
    },
    clearable: {
      type: Boolean,
      value: false
    },
    required: {
      type: Boolean,
      value: false
    },
    error: {
      type: Boolean,
      value: false
    },
    errorMessage: {
      type: String,
      value: ''
    },
    maxlength: {
      type: Number,
      value: -1
    },
    labelWidth: {
      type: String,
      value: '180rpx'
    },
    inputAlign: {
      type: String,
      value: 'left'
    },
    border: {
      type: Boolean,
      value: true
    },
    prefixIcon: {
      type: String,
      value: ''
    },
    suffixIcon: {
      type: String,
      value: ''
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
    },
    onClear() {
      this.setData({ innerValue: '' })
      this.triggerEvent('change', { value: '' })
      this.triggerEvent('clear')
    },
    onSuffixIconTap() {
      this.triggerEvent('click-suffix')
    }
  }
})
