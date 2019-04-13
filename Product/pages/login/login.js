// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    code_url:'http://ugi.eliboard.com/apis/service/verifycode/init',
    yz_code:'',
    username:'',
    password:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  cancel: function(){

  },

  confirm: function(){
    let vm = this;
    wx.request({
      url: 'http://ugi.eliboard.com/apis/service/user/login',
      method:"POST",
      data:{
        user_id: vm.data.username,
        user_pwd: vm.data.password,
        verify_code: vm.data.code
      },
      header:{
        'content-type':'application/json',
        'X-EMBIS':'web'
      },
      success:function(res){
        console.log(res.data.hm);
        if (res.data.hm==1){
          isLogin = true;
        }
      },
      fail: function(res){
        console.log(JSON.stringify(res));
      }
    })

  },

  userNameInput: function(e){
    let vm = this;
    vm.setData({
      username:e.detail.value
    });
  },

  passInput: function (e) {
    let vm = this;
    vm.setData({
      password: e.detail.value
    });
  },

  codeInput: function (e) {
    let vm = this;
    vm.setData({
      code: e.detail.value
    });
  },

  changeCode: function(){
    var timestamp = Date.parse(new Date());
    let vm = this;
    vm.setData({
      code_url:"http://ugi.eliboard.com/apis/service/verifycode/init?"+Math.random()
    });
  }















})