// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://106.14.159.80:27017";
var db = cloud.database();
var _ = db.command;
// 云函数入口函数
exports.main = async(event, context) => {
  // function prefixIntrger(num) {
  //   return (Array(2).join('0') + num).slice(-2);
  // }

  const {
    skip , limit 
  } = event
  // var startdate = new Date()
  // var year = startdate.getFullYear(); //获取完整的年份(4位,1970-????)  
  // var month = prefixIntrger(startdate.getMonth() + 1); //获取当前月份(0-11,0代表1月)         // 所以获取当前月份是startdate.getMonth()+1;   
  // //获取三天之类的期限
  // var date = prefixIntrger(startdate.getDate() - 3); //获取当前日(1-31)  
  // var hours = prefixIntrger(startdate.getHours()); //获取当前小时数(0-23)  
  // var minutes = prefixIntrger(startdate.getMinutes()); //获取当前分钟数(0-59)  
  // var seconds = prefixIntrger(startdate.getSeconds()); //获取当前秒数(0-59) 
  // var now = `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`
  
  return new Promise((resolve,reject)=>{
    MongoClient.connect(url, {
      useNewUrlParser: true
    }, function (err, db) {
      if (err) {
        console.log(err)
        throw err
      };
      var dbo = db.db("techweb");
        dbo.collection("news").find({
        }).sort({
          "time": -1
          }).limit(limit).skip(skip).toArray(function (err, result) {
          if (err) {
            reject(err)
          }
          console.log(result)
          resolve(result)
        });
      });
  })
  
}