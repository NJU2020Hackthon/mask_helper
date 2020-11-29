// miniprogram/pages/progress/progress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {
      orderNo: '666',
      orderCreateTime: '2020-11-29 17:09:34',
    },
    logisticsData: [
      {
        content: '已发送求助请求',
        time: '2020-11-29 17:09:34'
      },
      {
        content: '系统正在为您匹配',
        time: '2020-11-29 17:10:34'
      },
      {
        content: '已经匹配到愿意帮助者',
        time: '2020-11-29 17:11:34'
      },
      {
        content: '求助结束。预防保护要做好，出门口罩少不了',
        time: '2020-11-29 17:15:34'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})