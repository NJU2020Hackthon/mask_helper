// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //返回10m-1000m之间的查询
  db.collection('userdata').where({
    _openid: wxContext.OPENID
  }).update({
    location: db.Geo.Point(event.longitude,event.latitude)
  })
  const _ = db.command
  return db.collection('userdata').where({
    location:_.geoNear(
      {
        geometry:db.Geo.Point(event.longitude,event.latitude),
        minDistance:10,
        maxDistance:1000,
      }
    )
  }).get()

}