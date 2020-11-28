// pages/home/home.js
const app = getApp()
Page({
  data: {
    longitude: 118.72,  //默认定位经度
    latitude: 32.013,   //默认定位纬度
    status:0,
    markers: [
    {
      id: 0,
        iconPath: "../../images/position.png",
        latitude: 32.013,
        longitude: 118.72,
      width: 20,  //图片显示宽度
      height: 20  //图片显示高度
    },
      {
        id: 1,
        iconPath: "../../images/position.png",
        latitude: 32.2,
        longitude: 118.73,
        width: 20,
        height: 20
      },
      {
        id: 2,
        iconPath: "../../images/position.png",
        latitude: 32.3,
        longitude: 118.67,
        width: 20,
        height: 20
      }
    ]
  },
 
  onLoad: function () {
    // var that = this;
    // wx.getLocation({
    //   type: "wgs84",
    //   success: function (res) {
    //     var latitude = res.latitude;
    //     var longitude = res.longitude;
    //     //console.log(res.latitude);
    //     that.setData({
    //       latitude: res.latitude,
    //       longitude: res.longitude,
    //       markers: [{
    //         latitude: res.latitude,
    //         longitude: res.longitude
    //       }]
    //     })
    //   }
    // })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onBtnclick_1: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'test1',
      //发送经度 维度 状态
      data: {
        longitude:this.data.longitude,
        latitude:this.data.latitude,
        status:1
      },
      success: res => {
        // this.setData({
        //   status:1
        // },
        // )
        console.log('callFunction test result0: ', res),
        wx.showToast({
          title: '已发送求助信息',
          
        })
      },
      fail: err => {
        console.log('callFunction test result3 failed: ', err)
        wx.showToast({
          title: '求助失败',
        })
      }
    })
  },
  onBtnclick_2: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'test1',
      //发送经度 维度 状态
      data: {
        longitude:this.data.longitude,
        latitude:this.data.latitude,
        status:2
      },
      success: res => {
        this.setData({
          status:2
        }
        )
        wx.showToast({
          title: '已录入信息',
        })
      },
      fail: err => {
        wx.showToast({
          title: '录入信息失败',
        })
      }
    })
  }
})