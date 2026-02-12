import {
  getYearRange,
  getMonthRange,
  getDayRange,
  formatDate,
  parseDate
} from './date-util';

Component({
  externalClasses: ['custom-class'],
  properties: {
    // 是否显示选择器
    show: {
      type: Boolean,
      value: false
    },
    // 当前选中的日期值
    value: {
      type: String,
      value: ''
    },
    // 选择器标题
    title: {
      type: String,
      value: '请选择日期'
    },
    // 确认按钮文字
    confirmButtonText: {
      type: String,
      value: '确认'
    },
    // 取消按钮文字
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    // 最小可选日期，格式为 yyyy-MM-dd
    minDate: {
      type: String,
      value: ''
    },
    // 最大可选日期，格式为 yyyy-MM-dd
    maxDate: {
      type: String,
      value: ''
    },
    // 日期格式
    format: {
      type: String,
      value: 'yyyy-MM-dd'
    },
    // 是否显示取消按钮
    showCancelButton: {
      type: Boolean,
      value: true
    },
    // 是否允许点击遮罩层关闭
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    }
  },
  data: {
    years: [],
    months: [],
    days: [],
    yearIndex: 0,
    monthIndex: 0,
    dayIndex: 0,
    pickerValue: [0, 0, 0]
  },
  observers: {
    'show': function(newVal) {
      if (newVal && this.data.years.length === 0) {
        this.initDatePicker();
      }
    },
    'value': function(newVal) {
      if (newVal) {
        this.setValue(newVal);
      }
    },
    'minDate,maxDate': function() {
      this.updateRanges();
    }
  },
  methods: {
    initDatePicker() {
      // 初始化日期范围
      const minDate = this.properties.minDate ? parseDate(this.properties.minDate) : null;
      const maxDate = this.properties.maxDate ? parseDate(this.properties.maxDate) : null;
      
      // 获取年份列表
      const years = getYearRange(minDate, maxDate);
      this.setData({ years });
      
      // 设置默认日期
      let selectedDate = new Date();
      if (this.properties.value) {
        const parsedDate = parseDate(this.properties.value);
        if (parsedDate) {
          selectedDate = parsedDate;
        }
      }
      
      // 确保选中的日期在范围内
      if (minDate && selectedDate < minDate) {
        selectedDate = minDate;
      }
      if (maxDate && selectedDate > maxDate) {
        selectedDate = maxDate;
      }
      
      // 设置初始值
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      
      // 获取对应的索引
      const yearIndex = years.indexOf(year);
      const months = getMonthRange(year, minDate, maxDate);
      const monthIndex = months.indexOf(month);
      const days = getDayRange(year, month, minDate, maxDate);
      const dayIndex = days.indexOf(day);
      
      this.setData({
        months,
        days,
        yearIndex: yearIndex >= 0 ? yearIndex : 0,
        monthIndex: monthIndex >= 0 ? monthIndex : 0,
        dayIndex: dayIndex >= 0 ? dayIndex : 0,
        pickerValue: [
          yearIndex >= 0 ? yearIndex : 0,
          monthIndex >= 0 ? monthIndex : 0,
          dayIndex >= 0 ? dayIndex : 0
        ]
      });
    },
    
    setValue(dateStr) {
      const date = parseDate(dateStr);
      if (!date) return;
      
      const minDate = this.properties.minDate ? parseDate(this.properties.minDate) : null;
      const maxDate = this.properties.maxDate ? parseDate(this.properties.maxDate) : null;
      
      // 确保日期在范围内
      if (minDate && date < minDate) return;
      if (maxDate && date > maxDate) return;
      
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      // 获取年份列表
      const years = getYearRange(minDate, maxDate);
      const yearIndex = years.indexOf(year);
      
      // 获取月份列表
      const months = getMonthRange(year, minDate, maxDate);
      const monthIndex = months.indexOf(month);
      
      // 获取日期列表
      const days = getDayRange(year, month, minDate, maxDate);
      const dayIndex = days.indexOf(day);
      
      if (yearIndex >= 0 && monthIndex >= 0 && dayIndex >= 0) {
        this.setData({
          yearIndex,
          monthIndex,
          dayIndex,
          pickerValue: [yearIndex, monthIndex, dayIndex]
        });
      }
    },
    
    updateRanges() {
      if (!this.data.show) return;
      
      const minDate = this.properties.minDate ? parseDate(this.properties.minDate) : null;
      const maxDate = this.properties.maxDate ? parseDate(this.properties.maxDate) : null;
      
      // 获取当前选中的年份
      const currentYear = this.data.years[this.data.yearIndex];
      const months = getMonthRange(currentYear, minDate, maxDate);
      
      // 获取当前选中的月份
      const currentMonth = months[this.data.monthIndex] || months[0];
      const days = getDayRange(currentYear, currentMonth, minDate, maxDate);
      
      // 确保当前选中的月份和日期在新的范围内
      let monthIndex = this.data.monthIndex;
      if (monthIndex >= months.length) {
        monthIndex = months.length - 1;
      }
      
      let dayIndex = this.data.dayIndex;
      if (dayIndex >= days.length) {
        dayIndex = days.length - 1;
      }
      
      this.setData({
        years: getYearRange(minDate, maxDate),
        months,
        days,
        monthIndex,
        dayIndex
      });
    },
    
    onPickerChange(e) {
      const { value } = e.detail;
      const [yearIndex, monthIndex, dayIndex] = value;
      
      // 获取最小最大日期
      const minDate = this.properties.minDate ? parseDate(this.properties.minDate) : null;
      const maxDate = this.properties.maxDate ? parseDate(this.properties.maxDate) : null;
      
      // 如果年份变化
      if (this.data.yearIndex !== yearIndex) {
        const selectedYear = this.data.years[yearIndex];
        const months = getMonthRange(selectedYear, minDate, maxDate);
        
        // 获取当前选中的月份
        const currentMonth = months[monthIndex] || months[0];
        const days = getDayRange(selectedYear, currentMonth, minDate, maxDate);
        
        // 确保日期索引不超出范围
        let newDayIndex = dayIndex;
        if (newDayIndex >= days.length) {
          newDayIndex = days.length - 1;
        }
        
        this.setData({
          months,
          days,
          yearIndex,
          monthIndex: monthIndex >= months.length ? months.length - 1 : monthIndex,
          dayIndex: newDayIndex,
          pickerValue: [yearIndex, monthIndex >= months.length ? months.length - 1 : monthIndex, newDayIndex]
        });
      }
      // 如果月份变化
      else if (this.data.monthIndex !== monthIndex) {
        const selectedYear = this.data.years[yearIndex];
        const selectedMonth = this.data.months[monthIndex];
        const days = getDayRange(selectedYear, selectedMonth, minDate, maxDate);
        
        // 确保日期索引不超出范围
        let newDayIndex = dayIndex;
        if (newDayIndex >= days.length) {
          newDayIndex = days.length - 1;
        }
        
        this.setData({
          days,
          monthIndex,
          dayIndex: newDayIndex,
          pickerValue: [yearIndex, monthIndex, newDayIndex]
        });
      }
      // 仅日期变化
      else {
        this.setData({
          dayIndex,
          pickerValue: [yearIndex, monthIndex, dayIndex]
        });
      }
    },
    
    onConfirm() {
      const { years, months, days, yearIndex, monthIndex, dayIndex } = this.data;
      
      if (years.length === 0 || months.length === 0 || days.length === 0) {
        return;
      }
      
      const selectedYear = years[yearIndex];
      const selectedMonth = months[monthIndex];
      const selectedDay = days[dayIndex];
      
      const selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
      const formattedDate = formatDate(selectedDate, this.properties.format);
      
      this.triggerEvent('confirm', {
        value: formattedDate,
        date: selectedDate
      });
    },
    
    onCancel() {
      this.triggerEvent('cancel');
    },
    
    onClose() {
      if (this.properties.closeOnClickOverlay) {
        this.triggerEvent('close');
      }
    },
    
    onOverlayClick() {
      if (this.properties.closeOnClickOverlay) {
        this.triggerEvent('close');
      }
    }
  }
})
