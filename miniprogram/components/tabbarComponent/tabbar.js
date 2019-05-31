// tabBarComponent/tabBar.js
const app = getApp();
Component({

  properties: {
    tabbar:Object
  },
  /**
     * 组件的初始数据
     */
  data: {
    isIphoneX: app.globalData.model == "iPhone X" ? true : false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
