Page({
  data: {
    name: '',
    phone: '',
    password: '',
    amount: ''
  },
  onNameChange(e) { this.setData({ name: e.detail.value }) },
  onPhoneChange(e) { this.setData({ phone: e.detail.value }) },
  onPasswordChange(e) { this.setData({ password: e.detail.value }) },
  onAmountChange(e) { this.setData({ amount: e.detail.value }) }
})
