// pages/city/city.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollId:'thiscity',
    thisCity:'',
    visitcity: [],
    hotcity:[
      {
        cityname: '上海'
      },
      {
        cityname: '北京'
      },
      {
        cityname: '广州'
      },
      {
        cityname: '深圳'
      },
      {
        cityname: '武汉'
      },
      {
        cityname: '天津'
      },
      {
        cityname: '南昌'
      },
      {
        cityname: '上饶'
      },
      {
        cityname: '杭州'
      },
      {
        cityname: '成都'
      },
      {
        cityname: '重庆'
      }
    ],
    letter: [
      "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L","M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"
     ],
    citylist:[
      {
        "letter":"B",
        "data":[
          {
            "cityname":"北京"
          }
        ]
      },
      {
        "letter": "T",
        "data": [
          {
            "cityname": "天津"
          }
        ]
      },
      {
        "letter": "C",
        "data": [
          {
            "cityname": "重庆"
          }
        ]
      },
      {
        "letter": "S",
        "data": [
          {
            "cityname": "上海"
          }
        ]
      },
      {
        "letter": "X",
        "data": [
          {
            "cityname": "香港"
          }
        ]
      },
      {
        "letter": "A",
        "data": [
          {
            "cityname": "澳门"
          }
        ]
      },
    ],





  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCityList();
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
    var obj = {};
    var this_city = wx.getStorageSync("this_city");//获取定位城市
    var city = wx.getStorageSync("city");//获取当前城市
    wx.setNavigationBarTitle({//动态修改title
      title: "当前城市-"+city,
    })
    //获取最近访问的城市
    let visitcity = wx.getStorageSync("hiscity") == "" ? [] : wx.getStorageSync("hiscity");
    //若最近访问的城市不存在则代表第一次，所以放入定位城市
    if (wx.getStorageSync("hiscity") == ""){
      obj.cityname = this_city;
      visitcity.push(obj);
    }
    vm.setData({
      thisCity: this_city,//城市
      visitcity: visitcity//最近访问城市
    });
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

  selectCity: function(e){
    let vm = this;
    var dataset = e.currentTarget.dataset;
    var cityname = dataset.cityname;
    var addSign = 0;
    let visitcity = vm.data.visitcity;//获取最近访问城市列表
    //判断点击的城市是否已存在于访问列表中
    for (var i = 0; i < visitcity.length;i++){
      if (visitcity[i].cityname == cityname){
        addSign = 1;
      }
    }
    if(addSign==0){//若没有访问记录则添加到访问城市列表（本地存）
      var obj = {};
      obj.cityname = cityname;
      visitcity.push(obj);
      wx.setStorageSync("hiscity", visitcity);
    }
    wx.setStorageSync("city", dataset.cityname);
    wx.navigateBack({//跳回原来界面

    });

  },

  getCityList: function(){
    let vm = this;
    var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
    var qqmapsdk = new QQMapWX({
      key: '2GCBZ-YU5LX-WDE4Y-TVTN6-3S233-F7FKE'
    });
    var citylist = vm.data.citylist;
    qqmapsdk.getCityList({
      success:function(res){
        var cityJson = res.result[1];
        var sign="BTCSXA";
        for(var i=0;i<cityJson.length;i++){
          var item = {};
          var py = cityJson[i].pinyin[0].charAt(0).toUpperCase();//大写首字母
          item.cityname = cityJson[i].name;
          if(sign==null || sign==""){//初始化城市
            let obj = {};//存放城市信息
            let items = [];//存放城市详细信息
            items.push(item);
            obj.letter = py;
            obj.data = items;
            citylist.push(obj);
            sign = py;
          }else{
            if(sign.indexOf(py)==-1){//若城市没有被分类
              let obj = {};
              let items = [];
              items.push(item);
              obj.letter = py;
              obj.data = items;
              citylist.push(obj);
              sign = sign + py;
            }else{//已被分类
              for (var j = 0; j < citylist.length;j++){
                if (citylist[j].letter==py){
                  citylist[j].data.push(item);
                  break;
                }
              }
            }
          }
        }
        vm.setData({
          citylist: citylist
        });
      },
      fail: function(error){
        console.error(error);
      },
      complete: function(res){
        
      }
    });
  },

  chooseCate:function(e){
    let vm = this;
    var dataset = e.currentTarget.dataset;
    let itemId = dataset.id;
    console.log(itemId);
    vm.setData({
      scrollId:itemId
    });
  },

  tMove:function(e){
    var y = e.touches[0].clientY;
    var offsettop = e.currentTarget.offsetTop;
    console.log(0);
  }


})