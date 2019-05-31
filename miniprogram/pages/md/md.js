const http = require('../../api/http.js')

let url = null
let path = null
let baseUrl = null

Page({
  data: {
    md: {}
  },

  onLoad: function (options) {
    url = options.url
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