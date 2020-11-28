// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  db.collection('userdata').doc("0bcbdde05fc1eca90062944b4889d0f9").get({
    success:res=>{
      db.collection('userdata').doc(wxContext.OPENID).update({
          data:{
            state:"2"
          },
          success: res=>{
            console.log(res)
          },
          false:err=>{
            console.log(err)
          }
      })
    },
    false:err=>{
      console.log(err),
      db.collection('userdata').add({
        data:{
          state:"1"
        }
      })
    }
  })

  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}