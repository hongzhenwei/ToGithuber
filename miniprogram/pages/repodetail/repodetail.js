const app = getApp();
const access_token = require('../../config/secret.js')['token']
const repo = require('../../api/repo/index.js')
const base64 = require('../../utils/base64.js')

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    repo: '',
    name: '',
    readme: {}
  },
  onLoad: function(option) {
    console.log(option.full_name)
    var that = this
    this.setData({
      name: option.full_name
    })
    wx.showLoading({
      title: 'Loading... ',
    })
    repo(option.full_name).getRepo().then(res => {
      that.setData({
        repo: res.repo
      })
    })

    repo(option.full_name).readme().then(data => {
      const {
        content,
        download_url,
        path
      } = data
      const mdContent = base64.decode(content)
      const baseUrl = download_url.replace(new RegExp(`${path}$`), '')
      console.log({
        content: mdContent,
        baseUrl: baseUrl
      })
      this.setData({
        readme: {
          content: mdContent,
          baseUrl: baseUrl
        }
      })
      wx.hideLoading()

    })
  },
  touser(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/githubuser/githubuser?name=' + e.currentTarget.dataset.name,
    })
  },
  tomore(e) {
    wx.setClipboardData({
      data: 'https://github.com/' + this.data.repo.full_name,
      success() {
        wx.showToast({
          title: '链接已复制',
          duration: 2000,
        })
      },
    })
  }
})