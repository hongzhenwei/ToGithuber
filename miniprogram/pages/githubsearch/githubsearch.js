var app = getApp()
const search = require('../../api/search/index.js')
var user_page = 1
var repo_page = 1
var limit = 10
var userOnce = 1

var LoadMoreUser = function(that, q) {
  wx.showLoading({
    title: 'Loading...'
  })

  search().users({q,page:user_page,per_page:limit}).then(res=>{
    wx.hideLoading()
    console.log(res)
    that.setData({
      usersdata: [...that.data.usersdata, ...res]
    })
  }).catch(err=>console.log(err))
}

var LoadMoreRepo = function(that, q) {
  wx.showLoading({
    title: 'Loading...'
  })
  search().repos({ q, page: repo_page, per_page: limit }).then(res => {
    wx.hideLoading()
    console.log(res)
    that.setData({
        reposdata: [...that.data.reposdata, ...res.items]
      })
  }).catch(err => console.log(err))
  
}

Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    screenHeight: app.globalData.screenHeight,
    tabs: ['Repository', 'User'],
    usersdata:'',
    reposdata:'',
    querykey: 'python'
  },
  onLoad(option) {
    var that = this
    this.setData({
      querykey: option.key
    })
    LoadMoreRepo(that, this.data.querykey)
  },
  scrolltolower(e) {
    if (this.data.TabCur == 0) {
      var that = this
      repo_page++
      LoadMoreRepo(that, this.data.querykey)
    } else if (this.data.TabCur == 1) {
      var that = this
      user_page++
      LoadMoreUser(that, this.data.querykey)
    }
  },
  tabSelect(e) {
    var that = this
    if (userOnce) {
      LoadMoreUser(that, this.data.querykey)
      userOnce--
    }
    if (e.type == 'tap') {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    } else if (e.type == 'change') {
      this.setData({
        TabCur: e.detail.current
      })
    }

  },
  changeinput(e) {
    this.setData({
      querykey: e.detail.value
    })
  },
  querysearh(e) {
    var that = this
    repo_page = 1
    user_page = 1
    userOnce = 1
    this.setData({
      usersdata: [],
      reposdata: [],
      TabCur: 0
    })
    LoadMoreRepo(that, this.data.querykey)
  },
  torepodetail(e) {
    wx.navigateTo({
      url: '/pages/repodetail/repodetail',
    })
  },
  touserdetail(e) {
    wx.navigateTo({
      url: '/pages/githubuser/githubuser',
    })
  }
})