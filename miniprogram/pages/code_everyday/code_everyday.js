// pages/code_everyday/code_everyday.js
const app = getApp()
var initfavors = [false, false, false, false, false]
var favors = [false, false, false, false, false]
var problems = []
var i = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: app.globalData.windowHeight,
    StatusBar: app.globalData.StatusBar,
    problem_cur: 'left',
    shownote:false,
    showen:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     i = 0

    wx.showLoading({
      title: 'Loading...',
    })
    console.log(Date())
    var random = Math.floor((Math.random() * 900) + 1);
    wx.cloud.database().collection('leetcode').skip(random).limit(5).get().then(res => {
      console.log(res.data[0]['id'])
      wx.cloud.database().collection('leetcode_tags').where({
        question_id: res.data[0]['id'] 
      }).get().then(res => {
        wx.hideLoading()

        console.log(res)
        this.setData({
          tags: res.data,
        })
      })
      console.log(res)
      problems = res.data

      problems.map((item, index) => {
        wx.setStorage({
          key: item.id ,
          data: item,
        })
        wx.cloud.database().collection('leetcode_favors').where({
          _openid: wx.getStorageSync('openid'),
          problemid: item.id
        }).count().then(res => {
          if (res.total) {
            initfavors[index] = true
          }
          favors = [...initfavors]
          this.setData({
            likeit: initfavors[0]
          })
        }).catch(err => console.log(err))
      })
      console.log(problems)

      //初始化第一条是数据
      let cont = this.data.showen ? problems[i].en_content : problems[i].ch_content
      let datas = app.towxml.toJson(
        cont,
        // problems[0].content.replace(/Note:/g, 'Tips:'), // `markdown`或`html`文本内容
        'html' // `markdown`或`html`
      );
      this.setData({
        article: datas,
        problem: problems[0]
      })
      //判断该问题是否有笔记
      wx.cloud.database().collection('leetcode_notes').where({
        _openid: wx.getStorageSync('openid'),
        problemid: this.data.problem.id
      }).count().then(res => {
        if (res.total != 0) {
          this.setData({
            noteshow: true
          })
        } else {
          this.setData({
            noteshow: false
          })
        }
        console.log(res.total)
      }).catch(err => console.log(err))
    })
  },

  onUnload() {
    for (var i = 0; i < 5; i++) {
      if (favors[i] != initfavors[i]) {
        if (favors[i]) {
          //需要添加喜欢
          wx.cloud.database().collection('leetcode_favors').add({
            data: {
              problemid: problems[i].id,
              createtime: Date()
            }
          })
          console.log(problems[i].id)
        } else {
          // 需要删除喜欢
          console.log(favors[i])
          wx.cloud.callFunction({
            name: 'del_favor',
            data: {
              problemid: problems[i].id,
              _openid: wx.getStorageSync('openid')
            }
          }).then(res => console.log(res)).catch(err => console.log(err))
        }
      }
    }
  },

  onShow: function () {

  },
  shownote: function(){
    this.setData({
      shownote:!this.data.shownote
    })
  },
  torepodetail(e) {
    wx.navigateTo({
      url: '/pages/repodetail/repodetail?full_name=' + e.currentTarget.dataset['full_name'],
    })
  },
  toggle(e) {
    console.log(e);
    var anmiaton = e.currentTarget.dataset.class;
    var that = this;
    that.setData({
      animation: anmiaton
    })
    setTimeout(function () {
      that.setData({
        animation: '',
        backgroundimg: imgs[Math.floor((Math.random() * 9))]
      })
    }, 1000)
  },
  nextproblem(e) {
    i++
    wx.showLoading({
      title: 'loading.....',
    })
    this.setData({
      tags:[]
    })
    wx.cloud.database().collection('leetcode_tags').where({
      question_id: problems[i]['id'] 
    }).get().then(res => {
      wx.hideLoading()
      this.setData({
        tags: res.data
      })
      console.log(res)
    })
    console.log(i)
    let cont = this.data.showen ? problems[i].en_content : problems[i].ch_content
    let datas = app.towxml.toJson(
      cont,
      // problems[0].content.replace(/Note:/g, 'Tips:'), // `markdown`或`html`文本内容
      'html' // `markdown`或`html`
    );
    this.setData({
      shownote:false,
      article: datas,
      problem: problems[i],
      problem_cur: i == 4 ? 'right' : '',
      likeit: favors[i]
    })
    // 判断该问题是否有笔记
    wx.cloud.database().collection('leetcode_notes').where({
      _openid: wx.getStorageSync('openid'),
      problemid: this.data.problem.id 
    }).count().then(res => {
      if (res.total != 0) {
        this.setData({
          noteshow: true
        })
      } else {
        this.setData({
          noteshow: false
        })
      }
      console.log(res.total)
    }).catch(err => console.log(err))

  },
  lastproblem(e) {
    i--
    console.log(i)
    wx.cloud.database().collection('leetcode_tags').where({
      question_id: problems[i]['id'] 
    }).get().then(res => {
      this.setData({
        tags: res.data
      })
      console.log(res)
    })
    let cont = this.data.showen ? problems[i].en_content : problems[i].ch_content
    let datas = app.towxml.toJson(
      cont,
      // problems[0].content.replace(/Note:/g, 'Tips:'), // `markdown`或`html`文本内容
      'html' // `markdown`或`html`
    );
    this.setData({
      shownote:false,
      article: datas,

      problem: problems[i],
      problem_cur: i == 0 ? 'left' : '',
      likeit: favors[i]
    })
    // 判断该问题是否有笔记
    wx.cloud.database().collection('leetcode_notes').where({
      _openid: wx.getStorageSync('openid'),
      problemid: this.data.problem.id
    }).count().then(res => {
      if (res.total != 0) {
        this.setData({
          noteshow: true
        })
      } else {
        this.setData({
          noteshow: false
        })
      }
      console.log(res.total)
    }).catch(err => console.log(err))
  },
  toggleit(e) {
    let curindex
    var curproblem = e.currentTarget.dataset.cur
    for (var i = 0; i < 5; i++) {
      if (problems[i].id == curproblem) {
        curindex = i
      }
    }
    favors[parseInt(curindex)] = !favors[parseInt(curindex)]
    this.setData({
      likeit: favors[parseInt(curindex)]
    })
  },

  notecode(e) {
    wx.cloud.database().collection('leetcode_notes').add({
      data: {
        problemid: e.currentTarget.dataset.problemid,
        content: e.detail.value,
        createtime:Date()
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '新增一条笔记',
      })
      this.setData({
        shownote:false
      })
    }).catch(err => console.log(err))
    this.setData({
      inputvalue: ''
    })
    console.log(e.detail.value)
  },
  gethelp(e){
    wx.setClipboardData({
      data: 'https://leetcode-cn.com/problems/' + e.currentTarget.dataset.cur +'/comments/',
      success:function(){
        console.log('https://leetcode-cn.com/problems/' + e.currentTarget.dataset.cur + '/comments/')
        wx.showToast({
          title: '链接已复制',
        })
      }
    })
  },
  toggletranslate(e){
    
    this.setData({
      showen:!this.data.showen
    })
    let cont = this.data.showen ? problems[i].en_content : problems[i].ch_content
    let datas = app.towxml.toJson(
      cont,
      // problems[0].content.replace(/Note:/g, 'Tips:'), // `markdown`或`html`文本内容
      'html' // `markdown`或`html`
    );
    this.setData({
      article:datas
    })
  }
})