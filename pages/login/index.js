Page({
  data: {
    // 表单数据
    formData: {
      phone: '',
      password: '',
      code: ''
    },
    // 验证错误
    errors: {
      phone: '',
      password: '',
      code: ''
    },
    // 登录方式：phone(手机号) | code(验证码)
    loginType: 'phone',
    // 是否显示密码
    showPassword: false,
    // 倒计时
    countdown: 0,
    // 协议同意状态
    agree: false
  },
  
  // 输入框变化
  onInput(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value
    this.setData({
      [`formData.${field}`]: value,
      [`errors.${field}`]: ''
    })
  },
  
  // 切换登录方式
  switchLoginType() {
    this.setData({
      loginType: this.data.loginType === 'phone' ? 'code' : 'phone',
      errors: { phone: '', password: '', code: '' }
    })
  },
  
  // 切换密码显示
  togglePassword() {
    this.setData({ showPassword: !this.data.showPassword })
  },
  
  // 获取验证码
  getCode() {
    if (this.data.countdown > 0) return
    
    const phone = this.data.formData.phone
    if (!phone) {
      this.setData({ 'errors.phone': '请输入手机号' })
      return
    }
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      this.setData({ 'errors.phone': '请输入正确的手机号' })
      return
    }
    
    // 模拟发送验证码
    wx.showToast({ title: '验证码已发送', icon: 'none' })
    
    // 倒计时60秒
    this.setData({ countdown: 60 })
    this._startCountdown()
  },
  
  // 倒计时
  _startCountdown() {
    const timer = setInterval(() => {
      const countdown = this.data.countdown - 1
      this.setData({ countdown })
      if (countdown <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  },
  
  // 同意协议
  onAgreeChange(e) {
    this.setData({ agree: e.detail.value.length > 0 })
  },
  
  // 登录
  onLogin() {
    if (!this._validate()) return
    
    wx.showLoading({ title: '登录中...' })
    
    // 模拟登录请求
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({ title: '登录成功', icon: 'success' })
      
      // 登录成功后跳转到首页
      setTimeout(() => {
        wx.switchTab({ url: '/pages/index/index' })
      }, 1500)
    }, 1500)
  },
  
  // 表单验证
  _validate() {
    const { phone, password, code } = this.data.formData
    const errors = {}
    let isValid = true
    
    // 手机号验证
    if (!phone) {
      errors.phone = '请输入手机号'
      isValid = false
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      errors.phone = '请输入正确的手机号'
      isValid = false
    }
    
    // 登录方式验证
    if (this.data.loginType === 'phone') {
      if (!password) {
        errors.password = '请输入密码'
        isValid = false
      } else if (password.length < 6) {
        errors.password = '密码长度不能少于6位'
        isValid = false
      }
    } else {
      if (!code) {
        errors.code = '请输入验证码'
        isValid = false
      } else if (code.length !== 6) {
        errors.code = '验证码为6位数字'
        isValid = false
      }
    }
    
    // 协议验证
    if (!this.data.agree) {
      wx.showToast({ title: '请先同意用户协议', icon: 'none' })
      isValid = false
    }
    
    this.setData({ errors })
    return isValid
  },
  
  // 忘记密码
  onForget() {
    wx.navigateTo({ url: '/pages/forget/index' })
  },
  
  // 去注册
  onRegister() {
    wx.navigateTo({ url: '/pages/register/index' })
  }
})
