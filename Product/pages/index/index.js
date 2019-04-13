//index.js
//获取应用实例
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    province:'',//省份
    city:'',//城市
    latitude:'',// 纬度
    langitude:'',// 经度
    choose_tab:0,// 0：正在上映，1：即将上映
    lbImgs:[// 轮播图片地址
      '../../img/lb01.jpg',
      '../../img/lb02.jpg',
      '../../img/lb03.jpg',
      '../../img/lb04.jpg',
      '../../img/lb05.jpg'
    ],
    films:[//电影数据列表
      {
        pic:'../../img/fantanfengbao.jpeg',
        title:'反贪风暴4',
        type:3,
        isAct:0,
        score:'9.1',
        actor:'古天乐，郑嘉颖，林峯',
        note:'今天259家影院放映3578场',
      },
      {
        pic: '../../img/leitingshazan.jpg',
        title: '雷霆沙赞!',
        type: 4,
        isAct: 1,
        score: '7.9',
        actor: '阿尤斯曼·库拉纳，塔布，拉迪卡·艾普特',
        note: '今天258家影院放映2189场',
      },
      {
        pic: '../../img/tiaoyinshi.jpeg',
        title: '调音师',
        type: 1,
        isAct: 0,
        score: '',
        actor: '格莱高利·嘉德波瓦，格雷戈瓦·勒普兰斯-林盖，Danièle Lebrun',
        note: '今天251家影院放映1470场',
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let vm = this;
    vm.getLocation();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 关闭下拉刷新动画
    setTimeout(function(){
      wx.stopPullDownRefresh()
    },1000)
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  

  isOpen: function(){
    let vm = this;
    vm.setData({
      choose_tab: 0
    });
  },

  willOpen: function(){
    let vm = this;
    vm.setData({
      choose_tab:1
    });
  },

  getCity: function(e){
    var dataset = e.currentTarget.dataset;
    wx.setStorageSync("city", dataset.cityname);
    wx.navigateTo({
      url: '../city/city',
    })
  },

  getLocation: function () {
    let vm = this;
    
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        vm.getLocal(latitude, longitude)
        
      },
      fail: function (res) {
        console.log('fail:' + JSON.stringify(res))
      }
    })
  },


  getLocal: function (latitude, langitude) {
    let vm = this;
    var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
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
        wx.setStorageSync("this_city", city);

        var choseCity = wx.getStorageSync("city");
        if (null == choseCity || choseCity == '') {
          vm.setData({
            province: province,
            city: city,
            latitude: latitude,
            langitude: langitude
          })
        } else {
          vm.setData({
            city: choseCity
          });
        }
        
      },
      fail: function (res) {
        console.log(JSON.stringify(res));
      },
      
    });
  },

  search: function(){
    wx.navigateTo({
      url: '../search/search',
    })
  }




})