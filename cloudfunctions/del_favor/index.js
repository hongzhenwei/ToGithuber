// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    problemid,
    _openid
  } = event

  try{
    return  await cloud.database().collection('leetcode_favors').where({
      problemid,
      _openid
    }).remove().then(res => console.log(res)).catch(err => console.log(err))
  }catch(err){
    return err
  }

}