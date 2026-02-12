import { regionData } from './region-data';

Component({
  externalClasses: ['custom-class'],
  properties: {
    // 是否显示选择器
    show: {
      type: Boolean,
      value: false
    },
    // 当前选中的地址值 [province, city, county]
    value: {
      type: Array,
      value: []
    },
    // 选择器标题
    title: {
      type: String,
      value: '请选择地址'
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
    provinces: [],
    cities: [],
    counties: [],
    provinceIndex: 0,
    cityIndex: 0,
    countyIndex: 0,
    pickerValue: [0, 0, 0]
  },
  observers: {
    'show': function(newVal) {
      if (newVal && this.data.provinces.length === 0) {
        this.initRegionData();
      }
    },
    'value': function(newVal) {
      if (newVal && newVal.length === 3) {
        this.setValue(newVal);
      }
    }
  },
  methods: {
    initRegionData() {
      // 初始化省份数据
      this.setData({
        provinces: regionData
      });
      
      // 如果已有选中值，则初始化对应的城市和区县数据
      if (this.data.value && this.data.value.length === 3) {
        this.setValue(this.data.value);
      } else {
        // 默认选中第一项
        if (regionData.length > 0) {
          const firstProvince = regionData[0];
          const cities = firstProvince.children || [];
          
          this.setData({
            cities: cities,
            counties: cities.length > 0 ? (cities[0].children || []) : [],
            provinceIndex: 0,
            cityIndex: 0,
            countyIndex: 0,
            pickerValue: [0, 0, 0]
          });
        }
      }
    },
    
    setValue(value) {
      const [provinceName, cityName, countyName] = value;
      
      // 查找对应的索引
      let provinceIndex = 0;
      let cityIndex = 0;
      let countyIndex = 0;
      
      const provinceObj = regionData.find(province => province.name === provinceName);
      if (provinceObj) {
        provinceIndex = regionData.indexOf(provinceObj);
        const cities = provinceObj.children || [];
        
        const cityObj = cities.find(city => city.name === cityName);
        if (cityObj) {
          cityIndex = cities.indexOf(cityObj);
          const counties = cityObj.children || [];
          
          const countyObj = counties.find(county => county.name === countyName);
          if (countyObj) {
            countyIndex = counties.indexOf(countyObj);
          }
        }
        
        // 更新城市和区县数据
        this.setData({
          cities: cities,
          counties: cityObj ? (cityObj.children || []) : [],
          provinceIndex,
          cityIndex,
          countyIndex,
          pickerValue: [provinceIndex, cityIndex, countyIndex]
        });
      }
    },
    
    onPickerChange(e) {
      const { value } = e.detail;
      const [provinceIndex, cityIndex, countyIndex] = value;
      
      // 如果省份改变，更新城市和区县数据
      if (this.data.provinceIndex !== provinceIndex) {
        const selectedProvince = this.data.provinces[provinceIndex];
        const cities = selectedProvince ? (selectedProvince.children || []) : [];
        
        this.setData({
          cities: cities,
          counties: cities.length > 0 ? (cities[0].children || []) : [],
          provinceIndex,
          cityIndex: 0,
          countyIndex: 0,
          pickerValue: [provinceIndex, 0, 0]
        });
      }
      // 如果城市改变，更新区县数据
      else if (this.data.cityIndex !== cityIndex) {
        const selectedCity = this.data.cities[cityIndex];
        const counties = selectedCity ? (selectedCity.children || []) : [];
        
        this.setData({
          counties: counties,
          cityIndex,
          countyIndex: 0,
          pickerValue: [provinceIndex, cityIndex, 0]
        });
      }
      // 仅区县改变
      else {
        this.setData({
          countyIndex,
          pickerValue: [provinceIndex, cityIndex, countyIndex]
        });
      }
    },
    
    onConfirm() {
      const { provinces, cities, counties, provinceIndex, cityIndex, countyIndex } = this.data;
      
      if (!provinces[provinceIndex] || !cities[cityIndex] || !counties[countyIndex]) {
        return;
      }
      
      const selectedValue = [
        provinces[provinceIndex].name,
        cities[cityIndex].name,
        counties[countyIndex].name
      ];
      
      this.triggerEvent('confirm', {
        value: selectedValue,
        province: provinces[provinceIndex],
        city: cities[cityIndex],
        county: counties[countyIndex]
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
