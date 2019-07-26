
//app.js
const Towxml = require('/towxml/main')
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'testenv-6a6b5e',
        traceUser: true,
      })
    }
    wx.hideTabBar();

    var info = wx.getStorageSync("userInfo")
    var openid = wx.getStorageInfoSync("openid")
    this.globalData.userInfo = info!=''?info:null
    this.globalData.openid = openid!=''?openid:null

    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: res => {
        this.globalData.screenHeight = res.screenHeight / (res.screenWidth / 750)
        this.globalData.StatusBar = res.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - res.statusBarHeight;
        this.globalData.pxHeight = res.screenHeight - res.statusBarHeight - this.globalData.CustomBar;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.model = res.model
        console.log(res)
      }
    })
  },
  towxml: new Towxml(),
  onShow: function () {
    //隐藏系统tabbar
    wx.hideTabBar();
  },
  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    userInfo: null,
    screenHeight:0,
    windowHeight:0,
    pxHeight:0,
    StatusBar:0,
    Custom:null,
    CustomBar:0,
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [
        {
          "pagePath": "/pages/back/back",
          "text": "",
          "iconPath": "/icon/icon_togithuber.png",
          "selectedIconPath": "/icon/icon_togithuber.png",
          "isSpecial": true,
        },
        {
          "pagePath": "/pages/github/github",
          "text": "trending",
          "iconPath": "/icon/icon_github.png",
          "selectedIconPath": "/icon/icon_github_cur.png"
        },
        
        {
          "pagePath": "/pages/news/news",
          "text": "news",
          "iconPath": "/icon/icon_news.png",
          "selectedIconPath": "/icon/icon_news_cur.png"
        },
        {
          "pagePath": "/pages/cloumn/cloumn",
          "text": "cloumn",
          "iconPath": "/icon/icon_cloumn.png",
          "selectedIconPath": "/icon/icon_cloumn_cur.png"
        },
        {
          "pagePath": "/pages/code/code",
          "text": "code",
          "iconPath": "/icon/icon_code.png",
          "selectedIconPath": "/icon/icon_code_cur.png"
        }
      ]
    }
  }
})