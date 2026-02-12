Component({
  externalClasses: ['custom-class'],
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    },
    icon: {
      type: String,
      value: ''
    },
    isLink: {
      type: Boolean,
      value: false
    },
    url: {
      type: String,
      value: ''
    },
    border: {
      type: Boolean,
      value: true
    },
    clickable: {
      type: Boolean,
      value: false
    },
    titleWidth: {
      type: String,
      value: ''
    }
  },
  methods: {
    onTap() {
      
    }
  }
})
