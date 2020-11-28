// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  //修改对应用户的state信息，改成2 表示 正在求助
  const wxContext = cloud.getWXContext()
  // db.collection('userdata').add({
  //   data:{
  //     _openid:wxContext.OPENID,
  //     state:"2"
  //   }
  // })
  db.collection('userdata').where({
    _openid: wxContext.OPENID
  }).remove()
  db.collection('userdata').add({
    data:{
      _openid: wxContext.OPENID,
      state:"2"
    }
  })

  
  // if (temp.data.valueOf()==Array){
    
  //   db.collection('userdata').add({
  //     data:{
  //       _openid:wxContext.OPENID,
  //       state:"2"
  //       }
  //   })
  // }else{
  //   //return temp.data
  //   db.collection('userdata').where({
  //       _openid: wxContext.OPENID
  //     }).update({
  //       data:{
  //         state:"3"
  //       }
  //     })
  // }
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