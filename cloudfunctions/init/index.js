// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //用户刚刚进入小程序 在数据库里面登记他
    db.collection('userdata').add({
    data:{
      _openid: wxContext.OPENID,
      state:1,
      location: db.Geo.Point(event.longitude, event.latitude)
    }
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}