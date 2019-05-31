// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    newcheckin
  } = event
  try {
    const {
      total
    } = await db.collection('checkin_date').where({
      userid: wxContext.OPENID
    }).count()
    if (total == 1) {
      const res = db.collection('checkin_date').where({
        userid: wxContext.OPENID
      }).update({
        data: {
          count: _.inc(1),
          checkin: _.push(newcheckin)
        }
      })
      return res
    } else {
      const res =await db.collection('checkin_date').add({
        data: {
          userid: wxContext.OPENID,
          checkin: [newcheckin],
          count: 1
        }
      })
      return res
    }
  } catch (err) {
    return err
  }
}