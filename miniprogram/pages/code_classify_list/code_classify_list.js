// pages/code_classify_list/code_classify_list.js
var page = 0
var limit = 20
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      problems:[],
    windowHeight: app.globalData.windowHeight,
    options:{}
  },

  onLoad: function (options) {
    this.setData({
      options:options
    })
    if(options.type == 'difficulty'){
        this.LoadDifficulty()      
    }else{
        this.LoadTag()
    }
  },
  LoadDifficulty(){
    wx.showLoading({
      title: 'Loading...',
    })
    wx.cloud.database().collection('leetcode').where({
      difficulty: this.data.options.difficulty
    }).skip(page * limit).limit(limit).get().then(res => {
      wx.hideLoading()
      console.log(res)
      res.data.map(item => {
        wx.setStorage({
          key: item.id,
          data: item,
        })
      })
      this.setData({
        problems: [...this.data.problems, ...res.data]
      })
    })
  },
  LoadTag(){
    wx.showLoading({
      title: 'Loading...',
    })
    wx.cloud.database().collection('leetcode_tags').where({
      tag: this.data.options.tag
    }).skip(page * limit).limit(limit).get().then(res => {
      wx.hideLoading()
      var problemids = res.data.map(item => {
        return item.question_id
      })
      var problems = []
      console.log(problems)
      for (var i = 0; i < problemids.length; i++) {
        wx.cloud.database().collection('leetcode').where({
          id: problemids[i]
        }).get().then(res => {
          res.data.map(item => {
            wx.setStorage({
              key: item.id,
              data: item,
            })
          })
          problems.push(res.data[0])
          this.setData({
            problems: [...this.data.problems, ...res.data]
          })
        })
      }
    })
  },
  scrolltolower(e){
      if(this.data.options.type=='tag'){
        page++
        this.LoadTag()
      }else{
        page++
        this.LoadDifficulty()
      }
  },
  tocollectdetail(e){
    wx.navigateTo({
      url: '/pages/code_collect_detail/code_collect_detail?problemid=' + e.currentTarget.dataset.problemid,
    })
  },
  onShow: function () {

  },

})