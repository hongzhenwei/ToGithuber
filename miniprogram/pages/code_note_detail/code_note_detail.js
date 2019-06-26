// pages/code_note_detail/code_note_detail.js
const app = getApp();

Page({

  data: {
    problem:{},
    article:{},
    notes:[],
    shownote:false
  },


  onLoad: function (option) {
    console.log(option.problemid)
    this.setData({
      problem:wx.getStorageSync(option.problemid)
    })
    let datas = app.towxml.toJson(
      this.data.problem.content.replace(/Note:/g, 'Tips:'),               // `markdown`或`html`文本内容
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
      problemid:option.problemid,
      _openid:wx.getStorageSync('openid')
    }).get().then(res=>{
      this.setData({
        notes:res.data
      })
    })
    this.setData({
      article: datas,
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
  shownote(e){
    this.setData({
      shownote:!this.data.shownote
    })
  }

})