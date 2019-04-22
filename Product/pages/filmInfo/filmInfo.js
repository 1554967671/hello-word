// pages/filmInfo/filmInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    film:{},
    select_date:'今天4月20日',
    cinema:[
      {
        date:'今天4月20日',
        cinema_list:[
          {
            ida:1,
            cinema_name:'华纳国际影城',
            cinema_addr:'宝安区松岗街道燕川社区燕罗公路62号1号铺位二楼',
            price: 38,
            distance: '1.1km',
            cinema_lab:[ //电影院标签
              {
                lab_id:1,
                lab_text:'退',
                lab_color:'',
                lab_background:'',
                lab_width:''
              },
              {
                lab_id: 2,
                lab_text: '改签',
                lab_color: '',
                lab_background: '',
                lab_width: ''
              },
              {
                lab_id: 3,
                lab_text: '小吃',
                lab_color: '',
                lab_background: '',
                lab_width: ''
              },
              {
                lab_id: 4,
                lab_text: '折扣卡',
                lab_color: '',
                lab_background: '',
                lab_width: ''
              }
            ],
            card_info: '开卡特惠，首单2张立减4元',
            recent: ['11:05', '12:00', '14:00']
          },
          {
            ida: 1,
            cinema_name: '金逸影城(嘉域店)',
            cinema_addr: '宝安区公明街道松白路宏发嘉域花园一期商业裙楼2层',
            price: 40,
            distance: '2.1km',
            cinema_lab: [ //电影院标签
              {
                lab_id: 3,
                lab_text: '小吃',
                lab_color: '',
                lab_background: '',
                lab_width: ''
              }
            ],
            card_info: '',
            recent: ['10:30', '11:05', '12:40']
          }
        ]
      },
      {
        date: '周日4月21日',
        cinema_list: [
          {
            ida: 1,
            cinema_name: '金逸影城(嘉域店)',
            cinema_addr: '宝安区公明街道松白路宏发嘉域花园一期商业裙楼2层',
            price:40,
            distance:'2.1km',
            cinema_lab: [ //电影院标签
              {
                lab_id: 3,
                lab_text: '小吃',
                lab_color: '',
                lab_background: '',
                lab_width: ''
              }
            ],
            card_info:'',
            recent:['10:30','11:05','12:40']
          }
        ]
      },
      {
        date: '后天4月22日',
        cinema_list: [
          {
            ida: 1,
            cinema_name: '金逸影城(嘉域店)',
            cinema_addr: '宝安区公明街道松白路宏发嘉域花园一期商业裙楼2层',
            price: 40,
            distance: '2.1km',
            cinema_lab: [ //电影院标签
              {
                lab_id: 3,
                lab_text: '小吃',
                lab_color: '',
                lab_background: '',
                lab_width: ''
              }
            ],
            card_info: '',
            recent: ['10:30', '11:05', '12:40']
          }
        ]
      },
      {
        date: '4月23日',
        cinema_list: [
          {
            ida: 1,
            cinema_name: '金逸影城(嘉域店)',
            cinema_addr: '宝安区公明街道松白路宏发嘉域花园一期商业裙楼2层',
            price: 40,
            distance: '2.1km',
            cinema_lab: [ //电影院标签
              {
                lab_id: 3,
                lab_text: '小吃',
                lab_color: '',
                lab_background: '',
                lab_width: ''
              }
            ],
            card_info: '',
            recent: ['10:30', '11:05', '12:40']
          }
        ]
      },
      {
        date: '4月24日',
        cinema_list: [
          {
            ida: 1,
            cinema_name: '金逸影城(嘉域店)',
            cinema_addr: '宝安区公明街道松白路宏发嘉域花园一期商业裙楼2层',
            price: 40,
            distance: '2.1km',
            cinema_lab: [ //电影院标签
              {
                lab_id: 3,
                lab_text: '小吃',
                lab_color: '',
                lab_background: '',
                lab_width: ''
              }
            ],
            card_info: '',
            recent: ['10:30', '11:05', '12:40']
          }
        ]
      },

    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm = this;
    var film = wx.getStorageSync("film");
    wx.setNavigationBarTitle({
      title: film.title,
    })
    vm.setData({
      film:film,
    });
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

  isWant: function(e){
    let vm = this;
    let dataset = e.currentTarget.dataset;
    var sign = dataset.sign;
    var film = vm.data.film;
    if(sign==0){
      film.isWant = 1;
    }else{
      film.isWant = 0;
    }
    vm.setData({
      film:film
    });
    if (sign == 0) {
      wx.showToast({
        title: '已标记想看',
        icon:'succes',
        duration:1000,
        mask:true
      })
    } else {
      wx.showToast({
        title: '已取消标记',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }
  },

  selectDate: function(e){
    let vm = this;
    let dataset = e.currentTarget.dataset;
    var thisDate = dataset.date;
    var selectDate = vm.data.select_date;
    if(thisDate != selectDate){
      vm.setData({
        select_date:thisDate
      });
    }
  }




})