// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    const res=  await cloud.database().collection('checkin_date').where({
      userid:wxContext.OPENID
    }).get()
    return res
  }catch(err){
    return err
  }
}