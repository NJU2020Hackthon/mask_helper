// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  //修改对应用户的state信息，改成2 表示 正在求助;进行地理位置的初始化
  const wxContext = cloud.getWXContext()
  // db.collection('userdata').add({
  //   data:{
  //     _openid:wxContext.OPENID,
  //     state:"2"
  //   }
  // })
  db.collection('userdata').where({
    _openid: wxContext.OPENID
  }).update({
    data:{
      state:event.status,
      location: db.Geo.Point(event.longitude, event.latitude)
    },
    false:err=>{
      return err
    }
  }
  )

  return   db.collection('userdata').where({
    _openid: wxContext.OPENID
  }).get()

  
  
  // return db.collection('userdata').where({
  //   _openid: wxContext.OPENID
  // }).get()
  //return db.collection('userdata').get()

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}