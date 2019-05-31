  // 云函数入口文件
  const cloud = require('wx-server-sdk')
  const request = require('request')

  cloud.init()

  // 云函数入口函数
  exports.main = async(event, context) => {
    const wxContext = cloud.getWXContext()
    const {
      url
    } = event

    const parse = await new Promise((reslove, reject) => {
      request.post({
          url: 'https://developer.baidu.com/vcast/parserPageUrl',
          form: {
            url
          }
        },
        (err, httpResponse, body) => {
          data = JSON.parse(body)
          reslove(data)
        })
    }).then(data => {
      obj = new Object(data)
      let defaultoption = {
        sex: 4,
        speed: 5,
        volumn: 7,
        pit: 5,
        method: 'URL'
      }
      var content = obj.text.replace('【TechWeb】', '').replace('每日头条、业界资讯、热点资讯、八卦爆料，全天跟踪微博播报。各种爆料、内幕、花边、资讯一网打尽。百万互联网粉丝互动参与，TechWeb官方微博期待您的关注。', '')
      option = {
        title: obj.title.replace('TechWeb', ''),
        content: content,
        ...defaultoption
      }
      return option
      console.log(option)
    })

    const audio = await new Promise((reslove,reject)=>{
      request.post({
      url: 'https://developer.baidu.com/vcast/getVcastInfo',
      form: parse,
      headers: {
        Cookie: 'BDUSS=zVpV0NCVWJFMjVyUH5iSy1hVDdjS2puMHpmZH5RZzRRZld2RlBBQzY5OHhMTzljRVFBQUFBJCQAAAAAAAAAAAEAAABdjDWjRWxpb3QxOTk4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGfx1wxn8dcN;'
      }
    }, (err, httpResponse, body) => {
      reslove(body)
    })
    })

    return {
      code:1,
      audio:new Object(JSON.parse(audio))
    }
  }
