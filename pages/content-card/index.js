Page({
  data: {
    cardData: {
      basic: {
        title: '基础卡片',
        desc: '这是基础内容卡片的描述',
        tag: '推荐',
        tagType: 'primary'
      },
      noTag: {
        title: '无标签卡片',
        desc: '这是一个没有标签的内容卡片示例'
      },
      customStyle: {
        title: '自定义样式',
        desc: '通过属性自定义卡片样式',
        tag: '热卖',
        tagType: 'danger'
      },
      clickable: {
        title: '可点击卡片',
        desc: '点击会有交互效果',
        tag: '新',
        tagType: 'success'
      }
    }
  },
  
  onCardClick(e) {
    console.log('卡片被点击了')
    wx.showToast({
      title: '卡片被点击',
      icon: 'none'
    })
  }
})
