// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://106.14.159.80:27017/";


// 云函数入口函数
exports.main = async (event, context) => {

  MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) {
      console.log(err)
      throw err};
    var skip = 0
    var dbo = db.db("techweb");
     dbo.collection("news").find({}).skip(skip).limit(1).toArray(function (err, result) {
        console.log('dd')
      });
      
  });

}