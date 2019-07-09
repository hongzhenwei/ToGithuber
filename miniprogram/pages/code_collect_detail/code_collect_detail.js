// pages/code_note_detail/code_note_detail.js
const app = getApp();

Page({

  data: {
    problem: {},
    article: {},
    notes: [],
    shownote:false,
    showen:true
  },


  onLoad: function (option) {
    console.log(option.problemid)
    this.setData({
      problem: wx.getStorageSync(option.problemid)
    })
    let cont = this.data.showen ? this.data.problem.en_content : this.data.problem.ch_content
    let datas = app.towxml.toJson(
      cont,
      // problems[0].content.replace(/Note:/g, 'Tips:'), // `markdown`或`html`文本内容
      'html' // `markdown`或`html`
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
  },
  shownote(e){
    this.setData({
      shownote:!this.data.shownote
    })
  },
  gethelp(e) {
    wx.setClipboardData({
      data: 'https://leetcode.com/problems/' + e.currentTarget.dataset.cur + '/solution/',
      success: function () {
        console.log('https://leetcode.com/problems/' + e.currentTarget.dataset.cur + '/solution/')
        wx.showToast({
          title: '链接已复制',
        })
      }
    })
    console.log(e)
  },
  toggletranslate(e) {

    this.setData({
      showen: !this.data.showen
    })
    let cont = this.data.showen ? this.data.problem.en_content : this.data.problem.ch_content
    let datas = app.towxml.toJson(
      cont,
      // problems[0].content.replace(/Note:/g, 'Tips:'), // `markdown`或`html`文本内容
      'html' // `markdown`或`html`
    );
    this.setData({
      article: datas
    })
  }

})