// pages/code_note_detail/code_note_detail.js
const app = getApp();

Page({

  data: {
    problem: {},
    article: {},
    notes: []
  },


  onLoad: function (option) {
    console.log(option.problemid)
    this.setData({
      problem: wx.getStorageSync(option.problemid)
    })
    let datas = app.towxml.toJson(
      this.data.problem.content,               // `markdown`或`html`文本内容
      'html'              // `markdown`或`html`
    );
    wx.cloud.database().collection('leetcode_tags').where({
      question_id: option.problemid
    }).get().then(res => {
      wx.hideLoading()
      this.setData({
        tags: res.data,
        problem_cur: true
      })
    })
    wx.cloud.database().collection('leetcode_notes').where({
      problemid: option.problemid,
      _openid: wx.getStorageSync('openid')
    }).get().then(res => {
      this.setData({
        notes: res.data
      })
    })
    this.setData({
      article: datas,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  notecode(e) {
    wx.cloud.database().collection('leetcode_notes').add({
      data: {
        problemid: e.currentTarget.dataset.problemid,
        content: e.detail.value
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '新增一条笔记',
      })
    }).catch(err => console.log(err))
    this.setData({
      inputvalue: ''
    })
    console.log(e.detail.value)
  }

})