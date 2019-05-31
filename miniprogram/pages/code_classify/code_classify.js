// pages/code_classify/code_classify.js
const tags = require('./tags.js')
var count = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags:tags,
    Count:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.cloud.database().collection('leetcode_questions').where({
      difficulty: 'Hard'
    }).count().then(res => res => {
      this.setData({
        hardCount: res.total
      })
      console.log(res.total)
    })

    this.setData({
      Count:count
    })
  },

  onShow: function () {
    tags:tags
  },

  tolist(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/code_classify_list/code_classify_list?difficulty=${e.currentTarget.dataset.difficulty}&type=difficulty`,
    })
  },
  totaglist(e){
    wx.navigateTo({
      url: `/pages/code_classify_list/code_classify_list?tag=${e.currentTarget.dataset.tag}&type=tag`,
    })
  }
})