Component({
  externalClasses: ['custom-class'],
  properties: {
    // 键盘类型：number(数字键盘) | idcard(身份证键盘) | car(车牌号键盘)
    type: {
      type: String,
      value: 'number'
    },
    // 是否显示键盘
    show: {
      type: Boolean,
      value: false
    },
    // 是否显示遮罩层
    overlay: {
      type: Boolean,
      value: true
    },
    // 是否显示删除按钮
    hideDelete: {
      type: Boolean,
      value: false
    },
    // 删除按钮文字
    deleteText: {
      type: String,
      value: '删除'
    },
    // 完成按钮文字
    confirmText: {
      type: String,
      value: '完成'
    },
    // 是否随机排序键盘
    random: {
      type: Boolean,
      value: false
    },
    // 键盘z-index
    zIndex: {
      type: Number,
      value: 100
    }
  },
  data: {
    keys: [],
    shuffledKeys: []
  },
  observers: {
    'type, random'() {
      this.initKeys();
    },
    'show'() {
      // 当show属性变化时，确保键盘能够正确显示或隐藏
      if (this.data.show) {
        // 显示键盘时的处理
        this.initKeys();
      }
    }
  },
  lifetimes: {
    attached() {
      this.initKeys();
    }
  },
  methods: {
    initKeys() {
      let keys = [];
      
      // 根据类型生成不同的键
      switch (this.properties.type) {
        case 'number':
          keys = [...Array(10)].map((_, i) => ({ text: i.toString(), type: 'number' }));
          break;
        case 'idcard':
          keys = [...Array(10)].map((_, i) => ({ text: i.toString(), type: 'number' }));
          keys.push({ text: 'X', type: 'letter' });
          break;
        case 'car':
          keys = [
            { text: 'Q', type: 'letter' }, { text: 'W', type: 'letter' }, { text: 'E', type: 'letter' },
            { text: 'R', type: 'letter' }, { text: 'T', type: 'letter' }, { text: 'Y', type: 'letter' },
            { text: 'U', type: 'letter' }, { text: 'I', type: 'letter' }, { text: 'O', type: 'letter' },
            { text: 'P', type: 'letter' }, { text: 'A', type: 'letter' }, { text: 'S', type: 'letter' },
            { text: 'D', type: 'letter' }, { text: 'F', type: 'letter' }, { text: 'G', type: 'letter' },
            { text: 'H', type: 'letter' }, { text: 'J', type: 'letter' }, { text: 'K', type: 'letter' },
            { text: 'L', type: 'letter' }, { text: 'Z', type: 'letter' }, { text: 'X', type: 'letter' },
            { text: 'C', type: 'letter' }, { text: 'V', type: 'letter' }, { text: 'B', type: 'letter' },
            { text: 'N', type: 'letter' }, { text: 'M', type: 'letter' }, { text: '京', type: 'province' },
            { text: '沪', type: 'province' }, { text: '粤', type: 'province' }, { text: '津', type: 'province' },
            { text: '冀', type: 'province' }, { text: '豫', type: 'province' }, { text: '云', type: 'province' },
            { text: '辽', type: 'province' }, { text: '黑', type: 'province' }, { text: '湘', type: 'province' },
            { text: '皖', type: 'province' }, { text: '鲁', type: 'province' }, { text: '苏', type: 'province' },
            { text: '浙', type: 'province' }, { text: '赣', type: 'province' }, { text: '鄂', type: 'province' },
            { text: '桂', type: 'province' }, { text: '甘', type: 'province' }, { text: '晋', type: 'province' },
            { text: '蒙', type: 'province' }, { text: '陕', type: 'province' }, { text: '吉', type: 'province' },
            { text: '闽', type: 'province' }, { text: '贵', type: 'province' }, { text: '渝', type: 'province' },
            { text: '川', type: 'province' }, { text: '青', type: 'province' }, { text: '琼', type: 'province' },
            { text: '宁', type: 'province' }, { text: '藏', type: 'province' }, { text: '港', type: 'province' },
            { text: '澳', type: 'province' }, { text: '新', type: 'province' }, { text: '使', type: 'province' }
          ];
          break;
        default:
          keys = [...Array(10)].map((_, i) => ({ text: i.toString(), type: 'number' }));
      }
      
      // 添加特殊按键
      if (this.properties.type !== 'car') {
        keys.push(
          { text: this.properties.deleteText, type: 'delete' },
          { text: '0', type: 'number' },
          { text: this.properties.confirmText, type: 'confirm' }
        );
      } else {
        keys.push(
          { text: this.properties.deleteText, type: 'delete' },
          { text: this.properties.confirmText, type: 'confirm' }
        );
      }
      
      this.setData({ keys });
      
      // 如果需要随机排序
      if (this.properties.random) {
        this.shuffleKeys();
      }
    },
    
    shuffleKeys() {
      // 随机打乱键盘顺序，但保留特殊键在固定位置
      const keys = [...this.data.keys];
      let numberKeys = [];
      let specialKeys = [];
      
      // 分离数字键和特殊键
      keys.forEach(key => {
        if (key.type === 'number') {
          numberKeys.push(key);
        } else {
          specialKeys.push(key);
        }
      });
      
      // Fisher-Yates 洗牌算法
      for (let i = numberKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numberKeys[i], numberKeys[j]] = [numberKeys[j], numberKeys[i]];
      }
      
      // 重新组合（对于数字键盘，特殊键在末尾；对于车牌键盘，特殊键在末尾）
      let shuffledKeys = [];
      if (this.properties.type === 'car') {
        shuffledKeys = [...numberKeys, ...specialKeys];
      } else {
        // 保留最后一个确认键的位置
        shuffledKeys = [...numberKeys.slice(0, -1), ...specialKeys];
      }
      
      this.setData({ shuffledKeys });
    },
    
    // 按键点击事件
    onKeyTap(e) {
      const { key } = e.currentTarget.dataset;
      let detail = { key: key.text };
      
      switch (key.type) {
        case 'number':
        case 'letter':
        case 'province':
          this.triggerEvent('input', detail);
          break;
        case 'delete':
          this.triggerEvent('delete', detail);
          break;
        case 'confirm':
          this.triggerEvent('confirm', detail);
          break;
      }
    },
    
    // 遮罩点击事件
    onOverlayTap() {
      if (this.properties.overlay) {
        this.triggerEvent('close');
      }
    }
  }
})
