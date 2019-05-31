// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    info
  } = event
  try {
    const result = await cloud.database().collection('users').add({
      data: {
        _id:wxContext.OPENID,
        userInfo: info
      }
    })
    return {
      result,
      event,
      openid: wxContext.OPENID
    }
  } catch (err) {
    return {
      err,
      openid: wxContext.OPENID

    }
  }




}