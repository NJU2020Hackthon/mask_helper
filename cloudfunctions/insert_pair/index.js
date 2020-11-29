// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //往pair表里面插入，接口需要提供求助人的id(needhelper_id)
  db.collection('pair').where({
    _openid: event.needhelper_id
  }).update({
    data:{
      _helpid:wxContext.OPENID
    }
  })
  



  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}