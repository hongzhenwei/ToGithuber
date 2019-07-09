// pages/code/code.js
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

const app = getApp()
const { checkLogin } = require('../../utils/util.js')
const year = new Date().getFullYear() // 年份
const month = new Date().getMonth() + 1// 月份
const day = new Date().getDate()
const str = MONTHS[new Date().getMonth()] // 月份字符串
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: app.globalData.windowHeight,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    showmodal: true,
    showqiandao:true,
    tishi:`< click me />`,
    demo5_days_style: [],
    year,
    month,
    day,
    str,
    showcalendar:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    app.editTabbar();

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获取打卡日历记录
    var obj = {
      month: 'current',
      day: day,
      color: 'white',
      background: '#aad4f5'
    }

    this.setData({
      showmodal: true
    })

    if (!checkLogin()) {
      wx.showToast({
        icon: 'loading',
        title: '请先授权',
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/back/back',
        })
      }, 1000)
    } else {
      wx.cloud.callFunction({
        name: 'get_checkin'
      }).then(res => {
        console.log(res)
        if (res.result.data.length > 0) {
          this.setData({
            demo5_days_style: res.result.data[0].checkin
          })
          var dds = this.data.demo5_days_style

          if (dds[dds.length - 1]['day'] == obj['day']) {
            this.setData({
              showqiandao: false
            })
          }
        }

      })
    }

  },
  tocodelist() {
    this.setData({
      showmodal: false
    })
    wx.navigateTo({
      url: '/pages/code_classify/code_classify',
    })
  },
  tocodeeveryday() {
    this.setData({
      showmodal: false
    })
    wx.navigateTo({
      url: '/pages/code_everyday/code_everyday',
    })
  },
  tocodepersonal() {
    this.setData({
      showmodal: false
    })
    wx.navigateTo({
      url: '/pages/code_personal/code_personal',
    })
  },
  qiandao(e) {
    //增加今日打卡记录
    var dd = this.data.demo5_days_style
    console.log(dd)
    dd.push({
      month: 'current',
      day: day,
      color: 'white',
      background: '#aad4f5'
    })
    console.log(dd)
    this.setData({
      showqiandao: false,
      showcalendar:true,
      demo5_days_style: dd,
      tishi: 'Code Everyday'
    })
    //同步云数据库
    wx.cloud.callFunction({
      name:'add_checkin',
      data:{
        newcheckin:{
          month: 'current',
          day: day,
          color: 'white',
          background: '#aad4f5'
        }
      }
    }).then(res=>console.log(res))
    
  },
  showcalendar(e){
    console.log(e)
    this.setData({
      showcalendar:!this.data.showcalendar
    })
  }
})