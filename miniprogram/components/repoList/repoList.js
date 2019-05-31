// components/repoList/repoList.js
Component({

  properties: {
    data:Array
  },
  data: {

  },
  methods: {
    torepodetail(e) {
      console.log(e)
      wx.navigateTo({
        url: '/pages/repodetail/repodetail?full_name=' +e.currentTarget.dataset['full_name'],
      })
    }
  }
})
