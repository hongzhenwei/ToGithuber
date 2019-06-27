const app = getApp();
const innerAudio = wx.createInnerAudioContext();
const { checkLogin} = require('../../utils/util.js')
let page = 1;
const limit = 18;
import {
  formatSeconds,
  toReadableTime
} from "../../utils/util.js"

// =====================================================================================================================
//异步加载数据
var loadMore = function(that, type = 'add') {
  wx.showLoading({
    title: 'Loading...'
  })
  var skip = (page - 1) * limit
  // 云数据库使用
  var db = wx.cloud.database()
  var result = [];
  console.log(skip,limit)
  wx.cloud.callFunction({
    'name':'test',
    data:{
      skip,limit
    }
  }).then(res => {
    console.log(res)
    res.result.map(item => {
      item.time = toReadableTime(item.time)
      console.log(toReadableTime(item.time))
      wx.setStorage({
        key: `${item._id}`,
        data: item,
      })
    })
    if (that.data.newsaudio){
      result = res.result
    }else{
    for (var i = 0, len = res.result.length; i < len; i += 3) {
      result.push(res.result.slice(i, i + 3));
    }
    }
    if (type == 'add') {
      that.setData({
        contentList: [...that.data.contentList, ...result]
      })
    } else {
      that.setData({
        contentList: result,
        topnum: 0
      })
    }
    page++;
    that.pauseMuisc()
    that.refreshView.stopPullRefresh()
    wx.hideLoading()

  })
}

// ========================================================================================================================


Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    contentList: [],
    loadinghidden: true,
    Height: app.globalData.pxHeight,
    pageScroll: 0,
    windowHeight: app.globalData.windowHeight,
    screenHeight: app.globalData.screenHeight,
    viewed: [],
    topnum: 0,
    tabbar: {},
    shakeflush: true,
    audiourl: '',
    showconfig:false,
    modalshow:true,
    // ==========================audio
    isPaused: true, //是否暂停,true 暂停
    lastTime: "", //剩余时间
    currentTime: 0, //播放时间
    clearWaveInterval: null, //其他音频播放的时候暂停动画
    curAudio: '',
    newsaudio:true
  },
  // ========================================================================================================================

  //暂停
  pauseMuisc() {
    innerAudio.pause();
    this.setData({
      currentTime: innerAudio.currentTime
    })
    this.setData({
      isPaused: true,
    })
    innerAudio.offEnded()
    innerAudio.offStop()
    innerAudio.offTimeUpdate();
  },
  playRecord(e) {
    var that = this
    console.log(this.data.audio, e.currentTarget.dataset.index)
    if (this.data.curAudio === e.currentTarget.dataset.index) {
      // 点击播放按钮时，判断是否是当前按钮的点击事件，如果是则判断是否赞同
      if (this.data.isPaused) {
        innerAudio.play();
        innerAudio.startTime = this.data.currentTime;
        this.setData({
          isPaused: false
        })

        innerAudio.onEnded(() => {
          innerAudio.offTimeUpdate();
          this.setData({
            isPaused: true,
            currentTime: 0
          })
        })
        innerAudio.onPlay(() => {
          console.log('onPlay')
          innerAudio.onTimeUpdate(() => {
            this.setLastTime();
          })
        })

      } else {
        this.pauseMuisc();
      }
    } else {
      //如果不是当前按钮的点击事件，则回复初始化并设置当前所在
      console.log('不是当前按钮')
      this.GetNewsAudio(that, e.currentTarget.dataset.index, e.currentTarget.dataset.url)
    }
  },
  setLastTime() {
    let ct = innerAudio.currentTime;
    let all = innerAudio.duration;
    let last = all - ct;
    console.log(last)
    this.setData({
      lastTime: formatSeconds(last)
    })
    clearTimeout(this.data.clearWaveInterval);
  },
  stopWave() {
    console.log("stop")
    this.setData({
      isPaused: true
    })
  },

  GetNewsAudio(that, index,url) {
    wx.showLoading({
      title: 'Loading....',
    })
    console.log('触发了方法')
    wx.cloud.callFunction({
      name: 'badiuparse',
      data: {
        url
      }
    }).then(res => {
      that.setData({
        audiourl: res.result.audio.bosUrl
      })
      console.log(that.data.audiourl)
      innerAudio.src = that.data.audiourl; // 设置音乐的路径
      that.setData({
        curAudio: index,
        isPaused: false, //是否暂停,true 暂停
        lastTime: "", //剩余时间
        currentTime: 0, //播放时间
        clearWaveInterval: null, //其他音频播放的时候暂停动画
      })
      innerAudio.play();
      innerAudio.startTime = this.data.currentTime;
      this.setData({
        isPaused: false
      })

      innerAudio.onEnded(() => {
        innerAudio.offTimeUpdate();
        this.setData({
          isPaused: true,
          currentTime: 0
        })
      })
      innerAudio.onPlay(() => {
        console.log('onPlay')
        innerAudio.onTimeUpdate(() => {
          this.setLastTime();
        })
      })
      wx.hideLoading()
    })
  },


  // =========================================================================================================================

  onLoad: function() {
    app.editTabbar();
    this.refreshView = this.selectComponent("#refreshView")
  },

  onShow: function() {

    var that = this;
    this.shakeflush = true;
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

    wx.onAccelerometerChange(function(e) {
      if (!that.shakeflush) {
        return
      }

      if (e.x > 1 || e.z > 1 || e.y > 1) {
        wx.stopAccelerometer()
        setTimeout(res => wx.startAccelerometer(), 1000)
        loadMore(that, 'flush')
      }
    })
  },

  onHide: function() {
    this.shakeflush = false
  },
  toggle: function(){
    this.setData({
      newsaudio:!this.data.newsaudio
    })
    var that = this 
    this.pauseMuisc()
    loadMore(that,'flush')
  },
  todetail(e) {
    console.log(e)
    var that = this
    var obid = e.currentTarget.dataset.target;
    if (this.data.curAudio != e.currentTarget.dataset.index){
      this.pauseMuisc()
    }
    wx.navigateTo({
      url: '/pages/newsdetail/newsdetail?_id=' + e.currentTarget.dataset.target,
    })
  },

  //触摸开始
  handletouchstart: function(event) {
    this.refreshView.handletouchstart(event)
  },
  //触摸移动
  handletouchmove: function(event) {
    this.refreshView.handletouchmove(event)
  },
  //触摸结束
  handletouchend: function(event) {
    this.refreshView.handletouchend(event)
  },
  //触摸取消
  handletouchcancel: function(event) {
    this.refreshView.handletouchcancel(event)
  },
  //页面滚动
  onPageScroll: function(event) {
    this.refreshView.onPageScroll(event)
    this.setData({
      pageScroll: event.scrollTop
    })
  },
  onPullDownRefresh: function() {
    var that = this
    loadMore(that, 'flush')
  },
  scrolltolower: function(e) {
    var that = this
    loadMore(that)
  },
  choosetype(e){
    if(e.currentTarget.dataset.type == 'audio'){
        this.setData({
          modalshow:false,
          newsaudio:true
        })
    }else{
      this.setData({
        modalshow: false,
        newsaudio: false
      })
    }
    var that = this
    loadMore(that)
  }
});