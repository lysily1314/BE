Page({
  data: {
    products: [
      {
        id: 1,
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: '秋冬新款纯棉T恤 宽松休闲百搭圆领短袖上衣',
        price: '89.00',
        originalPrice: '199.00',
        tag: '新品',
        desc: '多色可选 · 限时折扣'
      },
      {
        id: 2,
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: '日式简约陶瓷咖啡杯 带木柄手工制作马克杯',
        price: '45.00',
        originalPrice: '68.00',
        tag: '热销',
        desc: '匠心手作 · 高温烧制'
      },
      {
        id: 3,
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: '原木桌面收纳盒 多功能文具整理架',
        price: '126.00',
        originalPrice: '',
        tag: '',
        desc: '天然原木 · 环保材质'
      },
      {
        id: 4,
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: '便携式蓝牙耳机 降噪长续航运动入耳式',
        price: '258.00',
        originalPrice: '399.00',
        tag: '特惠',
        desc: '主动降噪 · 30h续航'
      }
    ]
  },
  onCardTap(e) {
    const { id } = e.currentTarget.dataset
    wx.showToast({ title: '点击了商品 #' + id, icon: 'none' })
  }
})
