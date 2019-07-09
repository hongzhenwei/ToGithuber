const http = require('../../api/http.js')
const app = getApp()
let url = null
let path = null
let baseUrl = null

Page({
  data: {
    md: {},
    screenHeight: app.globalData.screenHeight,

  },

  onLoad: function (options) {
url = options.url ? options.url:'https://raw.githubusercontent.com/521xueweihan/HelloGitHub/master/content/ .md'
  
    path = encodeURIComponent((decodeURIComponent(url.replace(/.*?([^/]+\.md)$/i, '$1'))))
    baseUrl = url.replace(/([^/]+\.[mM][dD])$/, '')
    console.log(url,path,baseUrl)
    wx.showLoading({
      title: 'Loading',
    })
    http.get(`${baseUrl}/${path}`).then(({ data, status }) => {
      wx.hideLoading()
      if (status !== 200) {
        wx.showToast({
          title: String(status),
          icon: 'none'
        })
        return
      }
      this.setData({
        md: {
          content: data,
          baseUrl: baseUrl
        }
      })
    })
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})