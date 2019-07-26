//index.js
const app = getApp()
const initHeight = 0
const minLoadingHeight = 50


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    height: 0,
    item: {
      name: 'scale-up',
      text: 'Login',
      color: 'olive'
    },
    cur_help:0,
    showmodal:false,
    CustomBar: app.globalData.CustomBar,
    StatusBar: app.globalData.StatusBar,
    windowHeight: app.globalData.windowHeight,
    screenHeight:app.globalData.screenHeight,
    flag: true,
    animation: '',
    tabbar: {},
    backgroundimg: 'https://7465-testenv-6a6b5e-1258142945.tcb.qcloud.la/admin_images/wallpaper/earth.jpg?sign=c011ab5a6a2e4ee28658e4b35d495016&t=1559133668',
  },

  onLoad: function() {
    app.editTabbar();
    this.setData({showmodal:false})
    var that = this
    //从全局加载app中查看是否存在用户信息，如果存在则直接获取
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }

  },

  onShow: function() {
    this.setData({cur_help:0})
  },

  hideModel(e) {
    var that = this
    this.setData({
      choosetags: false
    })

    for (var i = 0; i < this.data.userfavor.length; i++) {
      this.LoadRepo(that, this.data.userfavor[i], i + 1)
    }
    console.log(this.data.repo1)

  },

  getUserInfo: function(e) {
    console.log(e)
    const that = this
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      modalName: 'Image'
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {
        info: app.globalData.userInfo
      }
    }).then(res => {
      console.log(res)
      wx.setStorage({
        key: 'openid',
        data: res.result.openid,
      })
    }).catch(err => console.log(err))
  },
  toggle(e) {
    console.log(e);
    var anmiaton = e.currentTarget.dataset.class;
    var that = this;
    that.setData({
      animation: anmiaton
    })
    wx.clearStorage({
      success:function(){
        app.globalData.userInfo=''
        that.setData({
          hasUserInfo:false
        })
      }
    })
  },
  toggleshowhelp(e){
    this.setData({
      showmodal:!this.data.showmodal
    })
  },
})