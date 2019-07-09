const app = getApp();
const WxParse = require('../../components/wxParse/wxParse.js');

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    page: [],
    _id: '',
    comments: []
  },

  onLoad: function (option) {
    this.setData({
      _id: option._id
    })
    var that = this;
    var pageinfo = wx.getStorageSync(this.data._id)
    this.setData({
      page: pageinfo
    })
    var htmlcontent = pageinfo.content;
    console.log(htmlcontent)
    var dd = htmlcontent.replace(new RegExp('<img', "g"), '<img style="max-width:100%;height:auto" ');
    var hh = dd.replace('&#13;', ' ')
    WxParse.wxParse('article', 'html', hh, that, 5);
  },



})