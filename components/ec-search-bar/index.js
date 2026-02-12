const { debounce } = require('../common/utils')

Component({
  externalClasses: ['custom-class'],
  properties: {
    value: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '搜索'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    showAction: {
      type: Boolean,
      value: false
    },
    actionText: {
      type: String,
      value: '搜索'
    },
    background: {
      type: String,
      value: ''
    },
    maxlength: {
      type: Number,
      value: -1
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
      this._debouncedChange = debounce((val) => {
        this.triggerEvent('change', { value: val })
      }, 200)
    }
  },
  methods: {
    onInput(e) {
      const value = e.detail.value
      this.setData({ innerValue: value })
      this._debouncedChange(value)
    },
    onFocus(e) {
      this.setData({ focused: true })
      this.triggerEvent('focus', e.detail)
    },
    onBlur(e) {
      this.setData({ focused: false })
      this.triggerEvent('blur', e.detail)
    },
    onClear() {
      this.setData({ innerValue: '' })
      this.triggerEvent('change', { value: '' })
      this.triggerEvent('clear')
    },
    onSearch() {
      this.triggerEvent('search', { value: this.data.innerValue })
    },
    onConfirm(e) {
      this.triggerEvent('search', { value: e.detail.value })
    }
  }
})
