// components/userList/userList.js
Component({

  properties: {
    data:Array
  },

  data: {

  },

  methods: {
    touserdetail(e) {
      wx.navigateTo({
        url: '/pages/githubuser/githubuser?name=' + e.currentTarget.dataset['name'],
      })
    }
  }
})
