// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  db.collection('userdata').where({
    _openid: wxContext.OPENID
  }).update({data:{
    location: db.Geo.Point(event.longitude,event.latitude)
  }})

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}