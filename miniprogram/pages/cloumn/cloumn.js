// pages/cloumn/cloumn.js
const app = getApp();

Page({

  data: {
    modalshow: true,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },


  onLoad: function (options) {
    app.editTabbar();
  },

  onReady: function () {

  },

  onShow: function () {

  },

  tomd(e){
    console.log(e.currentTarget.dataset.url)
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: `/pages/md/md?url=${url}`,
    })
  }



})