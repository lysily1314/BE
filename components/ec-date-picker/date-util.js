/**
 * 日期处理工具类
 */

// 获取指定年月的天数
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// 获取指定年月日的日期对象
function getDate(year, month, day) {
  return new Date(year, month - 1, day);
}

// 格式化日期为字符串
function formatDate(date, format = 'yyyy-MM-dd') {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return format
    .replace('yyyy', year.toString())
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('dd', day.toString().padStart(2, '0'));
}

// 解析日期字符串
function parseDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  
  return new Date(year, month - 1, day);
}

// 获取年份范围
function getYearRange(minDate, maxDate) {
  const minYear = minDate ? minDate.getFullYear() : new Date().getFullYear() - 10;
  const maxYear = maxDate ? maxDate.getFullYear() : new Date().getFullYear() + 10;
  
  const years = [];
  for (let i = minYear; i <= maxYear; i++) {
    years.push(i);
  }
  return years;
}

// 获取月份范围
function getMonthRange(year, minDate, maxDate) {
  let start = 1;
  let end = 12;
  
  if (minDate && year === minDate.getFullYear()) {
    start = minDate.getMonth() + 1;
  }
  
  if (maxDate && year === maxDate.getFullYear()) {
    end = maxDate.getMonth() + 1;
  }
  
  const months = [];
  for (let i = start; i <= end; i++) {
    months.push(i);
  }
  return months;
}

// 获取日期范围
function getDayRange(year, month, minDate, maxDate) {
  let start = 1;
  let end = getDaysInMonth(year, month);
  
  if (minDate && year === minDate.getFullYear() && month === minDate.getMonth() + 1) {
    start = minDate.getDate();
  }
  
  if (maxDate && year === maxDate.getFullYear() && month === maxDate.getMonth() + 1) {
    end = maxDate.getDate();
  }
  
  const days = [];
  for (let i = start; i <= end; i++) {
    days.push(i);
  }
  return days;
}

module.exports = {
  getDaysInMonth,
  getDate,
  formatDate,
  parseDate,
  getYearRange,
  getMonthRange,
  getDayRange
};
