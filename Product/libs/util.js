//获取应用实例
const app = getApp()

function getLocation() {
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      var latitude = res.latitude
      var longitude = res.longitude
      getLocal(latitude, longitude)
    },
    fail: function (res) {
      console.log('fail:' + JSON.stringify(res))
      wx.showModal({
        title: '提示',
        content: '位置信息获取失败！',
      })
    }
  })
  
}


function getCity(latitude, langitude) {
  var QQMapWX = require('qqmap-wx-jssdk.js');
  // 实例化API核心类
  var qqmapsdk = new QQMapWX({
       key: '2GCBZ-YU5LX-WDE4Y-TVTN6-3S233-F7FKE'
      });
  qqmapsdk.reverseGeocoder({
    
    success: (res) => {
      let province = res.result.ad_info.province
      let city = res.result.ad_info.city
      if (city != null && city != "" && city.length > 1 && city.lastIndexOf('市') == city.length-1){
        city = city.substring(0,city.length-1);
      }
      wx.setStorageSync('province', province)
      wx.setStorageSync('city', city)//存放选择城市
      wx.setStorageSync('latitude', latitude)
      wx.setStorageSync('langitude', langitude)
        
    },
    fail: function (res) {
      console.log(JSON.stringify(res));
    },
    complete: (res) => {

    }

  });
}

function getLocal(latitude, langitude) {
  var QQMapWX = require('qqmap-wx-jssdk.js');
  // 实例化API核心类
  var qqmapsdk = new QQMapWX({
    key: '2GCBZ-YU5LX-WDE4Y-TVTN6-3S233-F7FKE'
  });
  qqmapsdk.reverseGeocoder({

    success: (res) => {
      let province = res.result.ad_info.province
      let city = res.result.ad_info.city
      if (city != null && city != "" && city.length > 1 && city.lastIndexOf('市') == city.length - 1) {
        city = city.substring(0, city.length - 1);
      }
      wx.setStorageSync('this_province', province)
      wx.setStorageSync('this_city', city)//存放定位城市
      wx.setStorageSync('this_latitude', latitude)
      wx.setStorageSync('this_langitude', langitude)

    },
    fail: function (res) {
      console.log(JSON.stringify(res));
    },
    complete: (res) => {

    }

  });
}

module.exports = {
  getLocation: getLocation
}



