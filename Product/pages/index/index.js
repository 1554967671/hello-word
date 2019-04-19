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
      '../../img/lb04.jpg',
      '../../img/lb05.jpg'
    ],
    films:[//电影数据列表
      {
        ida:1,
        pic:'../../img/fantanfengbao.jpeg',
        title:'反贪风暴4',
        ename:'P Storm',
        cate:'剧情,动作,犯罪',
        type:1,
        isAct:0,
        isWant:0,
        score:'9.1',
        scorenum: '240050',
        actor:'古天乐，郑嘉颖，林峯',
        note:'今天259家影院放映3578场',
        date: '2019-04-04',
        local:'中国香港,中国大陆',
        time:'98',
        caidan: ''
      },
      {
        ida: 2,
        pic: '../../img/leitingshazan.jpg',
        title: '雷霆沙赞!',
        ename: 'Shazam!',
        cate: '动作,奇幻,冒险',
        type: 4,
        isAct: 1,
        isWant: 0,
        score: '7.9',
        scorenum:'103008',
        actor: '阿尤斯曼·库拉纳，塔布，拉迪卡·艾普特',
        note: '今天258家影院放映2189场',
        date: '2019-04-15',
        local: '美国',
        time: '132',
        caidan:'有两个彩蛋，分别在片尾字幕前、后出现'
      },
      {
        ida: 3,
        pic: '../../img/tiaoyinshi.jpeg',
        title: '调音师',
        ename: 'AndhaDhun',
        cate: '悬疑,犯罪,喜剧',
        type: 1,
        isAct: 0,
        isWant: 0,
        score: '',
        scorenum: '',
        actor: '格莱高利·嘉德波瓦，格雷戈瓦·勒普兰斯-林盖，Danièle Lebrun',
        note: '今天251家影院放映1470场',
        date: '2019-04-03 18:00',
        local: '印度',
        time: '137',
        caidan: ''
      }
    ],

    want_films:[
      {
        ida: 1,
        pic: '../../img/fuchou4.jpg',
        title: '复仇者联盟4：终局之战',
        people: '1536202',
        date: '4月24日',
        type: 6,
        actor: '小罗伯特·唐尼，克里斯·埃文斯，马克·鲁法洛，克里斯·海姆斯沃斯，斯嘉丽·约翰逊，杰瑞米·雷纳，保罗·路德，布丽·拉尔森，汤姆·希德勒斯顿，汤姆·赫兰德，乔什·布洛林'
      },
      {
        ida: 2,
        pic: '../../img/xiayiren.jpg',
        title: '下一任：前任',
        people: '182297',
        date: '5月1日',
        type: 5,
        actor: '郭采洁，郑恺，李东学，谢依霖，刘心悠，邱欣怡，李荣浩，蓝心湄'
      },
      {
        ida: 3,
        pic: '../../img/pikaqiu.jpg',
        title: '大侦探皮卡丘',
        people: '118262',
        date: '5月10日',
        type: 5,
        actor: '瑞安·雷诺兹（配音），渡边谦，贾斯提斯·史密斯'
      },
      {
        ida: 4,
        pic: '../../img/tiaoyinshi.jpeg',
        title: '调音师',
        people: '125380',
        date: '5月18日',
        type: 5,
        actor: '格莱高利·嘉德波瓦，格雷戈瓦·勒普兰斯-林盖，Danièle Lebrun'
      },
      {
        ida: 5,
        pic: '../../img/leitingshazan.jpg',
        title: '雷霆沙赞!',
        people: '95634',
        date: '4月1日',
        type: 5,
        actor: '阿尤斯曼·库拉纳，塔布，拉迪卡·艾普特'
      },
      {
        ida: 6,
        pic: '../../img/fantanfengbao.jpeg',
        title: '反贪风暴4',
        people: '195634',
        date: '4月16日',
        type: 5,
        actor: '古天乐，郑嘉颖，林峯'
      },
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let vm = this;
    var thiscity = wx.getStorageSync("this_city");
    var city = wx.getStorageSync("city");
    if(city != null && city != "" && city !=thiscity){
      wx.showModal({
        title: '',
        content: '系统检测到你当前的城市是' + thiscity +'，是否要切换城市？',
        cancelText:"否",
        confirmText:"是",
        success:function(res){
          if(res.confirm){
            vm.setData({
              city:thiscity
            });
            wx.setStorageSync("city", thiscity);
          }
        },
        fail:function(res){
          console.log(res);
        }

      })
    }

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
  },

  filmInfo: function(e){
    let dataset = e.currentTarget.dataset;
    wx.setStorageSync("film", dataset.film);
    wx.navigateTo({
      url: '../filmInfo/filmInfo',
    })
  }



})