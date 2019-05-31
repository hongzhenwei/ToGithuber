// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
cloud.init()

axios.defaults.validateStatus = () => true

// 云函数入口函数
exports.main = async (event, context) => {
  return new Promise((resolve,reject)=>{
    axios(event).then(({status,headers,data})=>{
      resolve({status,headers,data})
    }).catch(err=>{
      reject(err)
    })
  })
}