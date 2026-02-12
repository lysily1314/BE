Component({
  externalClasses: ['custom-class'],
  properties: {
    // 当前页码
    current: {
      type: Number,
      value: 1
    },
    // 数据总数
    total: {
      type: Number,
      value: 0
    },
    // 每页条数
    pageSize: {
      type: Number,
      value: 10
    },
    // 页码按钮最多显示多少个
    maxPageNum: {
      type: Number,
      value: 5
    },
    // 是否显示省略号
    showEllipsis: {
      type: Boolean,
      value: true
    },
    // 是否显示总数
    showTotal: {
      type: Boolean,
      value: false
    },
    // 是否显示每页条数选择器
    showPageSizeSelector: {
      type: Boolean,
      value: false
    },
    // 每页条数选择器选项
    pageSizeOptions: {
      type: Array,
      value: [10, 20, 30, 40, 50]
    },
    // 是否显示跳转输入框
    showQuickJump: {
      type: Boolean,
      value: false
    },
    // 按钮大小：small | normal | large
    size: {
      type: String,
      value: 'normal'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
    pageNumList: [],
    currentSize: 10
  },
  observers: {
    'current, total, pageSize, maxPageNum': function() {
      this.updatePageNumList();
    }
  },
  lifetimes: {
    attached() {
      this.updatePageNumList();
    }
  },
  methods: {
    // 更新页码列表
    updatePageNumList() {
      const { current, total, pageSize, maxPageNum } = this.properties;
      const totalPage = Math.ceil(total / pageSize);
      
      if (totalPage <= maxPageNum) {
        // 总页数小于等于最大显示页数，显示全部页码
        const pageNumList = [];
        for (let i = 1; i <= totalPage; i++) {
          pageNumList.push(i);
        }
        this.setData({ pageNumList });
      } else {
        // 总页数大于最大显示页数，计算显示的页码
        let pageNumList = [];
        const half = Math.floor(maxPageNum / 2);
        
        if (current <= half + 1) {
          // 当前页靠近开头
          for (let i = 1; i <= maxPageNum - 1; i++) {
            pageNumList.push(i);
          }
          pageNumList.push(totalPage);
        } else if (current >= totalPage - half) {
          // 当前页靠近结尾
          pageNumList.push(1);
          for (let i = totalPage - maxPageNum + 2; i <= totalPage; i++) {
            pageNumList.push(i);
          }
        } else {
          // 当前页在中间
          pageNumList.push(1);
          for (let i = current - half; i <= current + half; i++) {
            if (i !== 1 && i !== totalPage) {
              pageNumList.push(i);
            }
          }
          pageNumList.push(totalPage);
        }
        
        this.setData({ pageNumList });
      }
    },
    
    // 上一页
    onPrev() {
      if (this.properties.disabled) return;
      
      const { current } = this.properties;
      if (current > 1) {
        this.onChange(current - 1);
      }
    },
    
    // 下一页
    onNext() {
      if (this.properties.disabled) return;
      
      const { current, total, pageSize } = this.properties;
      const totalPage = Math.ceil(total / pageSize);
      
      if (current < totalPage) {
        this.onChange(current + 1);
      }
    },
    
    // 跳转到指定页
    onPageTap(e) {
      if (this.properties.disabled) return;
      
      const { page } = e.currentTarget.dataset;
      this.onChange(page);
    },
    
    // 页码变化
    onChange(page) {
      if (this.properties.current === page) return;
      
      this.setData({ current: page });
      this.triggerEvent('change', { current: page });
    },
    
    // 每页条数变化
    onPageSizeChange(e) {
      if (this.properties.disabled) return;
      
      const pageSize = parseInt(e.detail.value);
      this.setData({ currentSize: pageSize });
      this.triggerEvent('pageSizeChange', { pageSize });
    },
    
    // 快速跳转
    onQuickJump(e) {
      if (this.properties.disabled) return;
      
      const page = parseInt(e.detail.value);
      const { total, pageSize } = this.properties;
      const totalPage = Math.ceil(total / pageSize);
      
      if (page >= 1 && page <= totalPage) {
        this.onChange(page);
      }
    }
  }
})
