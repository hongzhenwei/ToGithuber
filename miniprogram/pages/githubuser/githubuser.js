const app = getApp();
const access_token = require('../../config/secret.js')['githubtoken']
var per_page = 10
const users = require('../../api/user/users.js')

let LR = true
let LFS = true
let LFG = true
let LS = true
let LM = true

var LoadRepos = function(that) {
  wx.showLoading({
    title: 'Loading...'
  })

  users(that.data.name).repos({
    page: that.data.pages[0],
    per_page
  }).then(res => {
    that.setData({
      reposdata: that.data.reposdata.concat(res)
    })
    wx.hideLoading()
    console.log(res)
  })

}

var LoadMembers = function (that) {
  wx.showLoading({
    title: 'Loading...'
  })

  users(that.data.name).members({
    page: that.data.pages[1],
    per_page
  }).then(res => {
    that.setData({
      membersdata: that.data.membersdata.concat(res)
    })
    wx.hideLoading()
    console.log(that.data.membersdata)
  })

}

var LoadStars = function(that) {
  wx.showLoading({
    title: 'Loading...'
  })  
  users(that.data.name).starred({
    page: that.data.pages[1],
    per_page
  }).then(res => {
    that.setData({
      starsdata: that.data.starsdata.concat(res)
    })
    wx.hideLoading()
    console.log(res)
  })


}

var LoadFollowers = function(that) {
  wx.showLoading({
    title: 'Loading...'
  })
  users(that.data.name).followers({
    page: that.data.pages[2],
    per_page
  }).then(res => {
    that.setData({
      followersdata: that.data.followersdata.concat(res.followers)
    })
    wx.hideLoading()
    console.log(that.data.followersdata)
  })
}

var LoadFollowings = function(that) {
  wx.showLoading({
    title: 'Loading...'
  })
  users(that.data.name).following({
    page: that.data.pages[3],
    per_page
  }).then(res => {
    console.log(res)

    that.setData({
      followingsdata: that.data.followingsdata.concat(res.following)
    })
    wx.hideLoading()

  })
}
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    cloumntabs: ['Profile', 'Repositories', 'Stars', 'Followers', 'Followings'],
    cloumntabs_org: ['Profile', 'Respositories', 'Members'],
    isorg: false,
    TabCur: 0,
    screenHeight: app.globalData.screenHeight,
    user: '',
    name: ' ',
    reposdata: [],
    starsdata: [],
    followersdata: [],
    followingsdata: [],
    membersdata:[],
    pages: [1, 1, 1, 1]

  },
  onLoad(option) {
    console.log(option)
    wx.showLoading({
      title: 'Loading...'
    })
    var that = this
    this.setData({
      name: option.name
    })
    users(that.data.name).get().then(res => {
      wx.hideLoading()
      this.setData({
        user: res
      })
      if (res.type == "Organization") {
        this.setData({
          isorg: true
        })
      }
    })

  },
  onShow() {
    LR = true
    LFS = true
    LFG = true
    LS = true
    LM = true
  },
  tabSelect(e) {
    var that = this

    if (!this.data.isorg) {
      if (e.type == 'tap') {
        this.setData({
          TabCur: e.currentTarget.dataset.id,
          scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
      } else if (e.type == 'change') {
        this.setData({
          TabCur: e.detail.current,
          scrollLeft: (e.detail.current - 1) * 60
        })
      }
      if (this.data.TabCur == 1 && LR) {
        LR = false
        LoadRepos(that)
      } else if (this.data.TabCur == 2 && LS) {
        LS = false
        LoadStars(that)
      } else if (this.data.TabCur == 3 && LFS) {
        LFS = false
        LoadFollowers(that)
      } else if (this.data.TabCur == 4 && LFG) {
        LFG = false
        LoadFollowings(that)
      }
    }else{
      if (e.type == 'tap') {
        this.setData({
          TabCur: e.currentTarget.dataset.id,
        })
      } else if (e.type == 'change') {
        this.setData({
          TabCur: e.detail.current,
        })
      }
      if (this.data.TabCur == 1 && LR) {
        LR = false
        LoadRepos(that)
      } else if (this.data.TabCur == 2 && LM) {
        LM = false
        LoadMembers(that)
      } 
      }

  },
  scrolltolower(e) {
    var that = this
    var cur = this.data.TabCur
    if(!this.data.isorg){
      if (cur == 1) {
        that.data.pages[0]++
        LoadRepos(that)
      } else if (cur == 2) {
        that.data.pages[1]++
        LoadStars(that)
      } else if (cur == 3) {
        that.data.pages[2]++
        LoadFollowers(that)
      } else if (cur == 4) {
        that.data.pages[3]++
        LoadFollowings(that)
      }
    }else{
      if (cur == 1) {
        that.data.pages[0]++
        LoadRepos(that)
      } else if (cur == 2) {
        that.data.pages[1]++
        LoadMembers(that)
      } 
    }
    
  }
})