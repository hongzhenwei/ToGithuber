const app = getApp();
const trending = require('../../api/trending/index.js')
const {checkLogin} = require('../../utils/util.js')
const loadTrending=function(that,since,language='all'){
  wx.showLoading({
    title: 'Loading...'
  })
  trending(since,language).then(res=>{
        that.setData({
          data:res
        })
        wx.hideLoading()
        console.log(res)
  }).catch(err=>{
    console.log(err)
    wx.showToast({
      title: 'Something wrong',
    })
  })
}

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    loadProgress: 0,
    searching: false,
    scrollLeft: 0,
    pickerhidden: true,
    screenHeight:app.globalData.screenHeight,
    windowHeight:app.globalData.windowHeight,
    since:['Monthly','Weekly','Daily'],
    language:[
      'All',
      'C', 'CSS', 'C#', 'C++',
      'Dart', 'Dockerfile',
      'Erlang',
      'Gradle', 'Go',
      'HTML', 'Haskell',
      'Java', 'JavaScript', 'JSON', 'Julia',
      'Kotlin',
      'MATLAB',
      'Python', 'PHP',
      'R', 'Ruby', 'Rust',
      'Shell', 'SQL', 'Swift',
      'TeX',
      'Vue'
    ],
    data:'',
    value:[0,0],
    topnum:0,
    tabbar:{},
    modalshow:true,
    curSince:''
  },
  onLoad() {
    app.editTabbar();

    var that =this;
    this.menu = this.selectComponent("#menu")
  },
  onShow() {
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
    }
  },
  search(e) {
    console.log(e);
    this.setData({
      searching: true,
      moto: e.detail.value
    })
    this.loadProgress();
    //当点击确认搜索按钮后会由记载条
  },

  pickerchange(e){
    this.setData({
      value:e.detail.value
    })
  },

  loadchange(e){
    var that = this
    var since_cur = this.data.value[0];
    var language_cur = this.data.value[1];
    var since = this.data.since[since_cur].toLowerCase();
    var language = this.data.language[language_cur].toLowerCase();
    console.log(since,language)
    loadTrending(that, since ,language);
    const temp = !this.data.pickerhidden
    this.setData({
      pickerhidden: temp
    })  },

  togglepicker(e){
    const temp = !this.data.pickerhidden
    console.log(e)
    this.setData({
      pickerhidden:temp
    })
  },

  torepo(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/repodetail/repodetail?full_name=' + e.currentTarget.dataset['fullname'],
    })
  },

  touser(e){
    wx.navigateTo({
      url: '/pages/githubuser/githubuser?name='+e.currentTarget.dataset['name'],
    })
  },
  tosearch(e){
    wx.navigateTo({
      url: '/pages/githubsearch/githubsearch?key='+e.detail.value,
    })
  },
  choosesince(e){
    console.log(e.currentTarget.dataset.since)
    var that = this
    var since = e.currentTarget.dataset.since
    var index = this.data.since.indexOf(since)
    
    loadTrending(that,e.currentTarget.dataset.since.toLowerCase())
    this.setData({
      modalshow:false,
      "value[0]":index
    })
  }

})