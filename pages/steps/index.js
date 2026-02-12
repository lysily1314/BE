Page({
  data: {
    active1: 1,
    active2: 2,
    active3: 1,
    active4: 0
  },
  onChange1(e) { this.setData({ active1: e.detail.value }) },
  onChange2(e) { this.setData({ active2: e.detail.value }) },
  onChange3(e) { this.setData({ active3: e.detail.value }) },
  onChange4(e) { this.setData({ active4: e.detail.value }) },
  onPrev1() { this.setData({ active1: Math.max(0, this.data.active1 - 1) }) },
  onNext1() { this.setData({ active1: Math.min(3, this.data.active1 + 1) }) },
  onPrev2() { this.setData({ active2: Math.max(0, this.data.active2 - 1) }) },
  onNext2() { this.setData({ active2: Math.min(3, this.data.active2 + 1) }) }
})
