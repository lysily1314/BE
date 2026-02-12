Page({
  data: {
    show1: true,
    show2: true,
    show3: true,
    show4: true
  },
  onClose1() { this.setData({ show1: false }) },
  onClose2() { this.setData({ show2: false }) },
  onClose3() { this.setData({ show3: false }) },
  onClose4() { this.setData({ show4: false }) }
})
