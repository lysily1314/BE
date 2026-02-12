Page({
  data: {
    // 基础轮播图数据
    basicList: [
      {
        url: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        title: '夏日风情'
      },
      {
        url: 'https://img.yzcdn.cn/vant/apple-2.jpg',
        title: '山间美景'
      },
      {
        url: 'https://img.yzcdn.cn/vant/apple-3.jpg',
        title: '海天一色'
      }
    ],
    // 商品轮播图数据
    productList: [
      {
        url: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        title: '夏季连衣裙 ¥99',
        price: '¥99.00'
      },
      {
        url: 'https://img.yzcdn.cn/vant/apple-2.jpg',
        title: '时尚T恤 ¥59',
        price: '¥59.00'
      },
      {
        url: 'https://img.yzcdn.cn/vant/apple-3.jpg',
        title: '休闲裤 ¥129',
        price: '¥129.00'
      }
    ],
    // 无标题轮播图数据
    noTitleList: [
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg',
      'https://img.yzcdn.cn/vant/apple-3.jpg'
    ],
    // 当前索引
    current: 0
  },

  // 轮播图切换事件
  onChange(e) {
    console.log('轮播图切换到:', e.detail.current);
    this.setData({
      current: e.detail.current
    });
  },

  // 图片点击事件
  onImageClick(e) {
    const { index, item } = e.detail;
    wx.showToast({
      title: `点击了第${index + 1}张图片`,
      icon: 'none'
    });
    console.log('点击的图片信息:', item);
  }
})
