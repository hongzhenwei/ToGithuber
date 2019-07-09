// pages/code_personal/code_personal.js
 var noteOnce =1
 const app = getApp()
const {toReadableTime} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['我的收藏', '我的笔记'],
    TabCur: 0,
    screenHeight: app.globalData.screenHeight,
    notes: [],
    favors: [],
    problem: '',
    article: {},
    tags: [],
    problem_cur: false,
    likeit: false,
    inputvalue: '',
    noteshow: false,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.LoadMoreFavor()
      noteOnce=1
  },
  tabSelect(e) {
    if (noteOnce) {
      noteOnce--
      this.LoadMoreNote()
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
  LoadMoreNote(){
    wx.cloud.database().collection('leetcode_notes').where({
      _openid: wx.getStorageSync('openid')
    }).get().then(res => {
      var problems = [...new Set(res.data.map(item => { return item.problemid }))]
      console.log(problems)
      for (let i = 0; i < problems.length; i++) {
        wx.cloud.database().collection('leetcode').where({
          id: problems[i]
        }).get().then(res => {
          console.log(res)
          var note = {
            'title': res.data[0].title,
            'difficulty': res.data[0].difficulty,
            'problemid': res.data[0].id,
            'createtime':toReadableTime(res.data[0].createtime)
          }
          var notes = this.data.notes
          notes.push(note)
          this.setData({
            notes: notes
          })
          wx.setStorage({
            key: res.data[0].id,
            data: res.data[0],
          })
          console.log(this.data.notes)
        })
      }
    })
  },
  tonotedetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/code_note_detail/code_note_detail?problemid=' + e.currentTarget.dataset.problemid,
    })
  },
  LoadMoreFavor(e){
    wx.cloud.database().collection('leetcode_favors').where({
      _openid: wx.getStorageSync('openid')
    }).get().then(res => {
      var problems = [...new Set(res.data.map(item => { return item.problemid }))]
      console.log(problems)
      for (let i = 0; i < problems.length; i++) {
        wx.cloud.database().collection('leetcode').where({
          id: problems[i]
        }).get().then(res => {
          console.log(res)
          var favor = {
            'title': res.data[0].title,
            'difficulty': res.data[0].difficulty,
            'problemid': res.data[0].id,
            'createtime': toReadableTime(res.data[0].createtime)

          }
          var favors = this.data.favors
          favors.push(favor)
          this.setData({
            favors: favors
          })
          wx.setStorage({
            key: res.data[0].id,
            data: res.data[0],
          })
          console.log(this.data.favors)
        })
      }
    })
  },
  tocollectdetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/code_collect_detail/code_collect_detail?problemid=' + e.currentTarget.dataset.problemid,
    })
  }


 
})