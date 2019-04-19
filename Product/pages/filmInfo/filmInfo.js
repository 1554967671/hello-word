// pages/filmInfo/filmInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    film:{},
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
  }






})