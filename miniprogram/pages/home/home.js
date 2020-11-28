// pages/home/home.js
const app = getApp()
Page({
  data: {
    longitude: 0, //默认定位经度
    latitude: 0, //默认定位纬度
    status: 1,
    target_longitude: 118.72, //导航目标定位经度
    target_latitude: 32.013, //导航目标定位纬度
    markers: [{
        id: 0,
        iconPath: "../../images/position.png",
        latitude: 32.013,
        longitude: 118.72,
        width: 20, //图片显示宽度
        height: 20 //图片显示高度
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
    var that = this;
    this.getpos();
    wx.cloud.callFunction({
      name: 'init',
      //发送经度 维度 状态
      data: {
        longitude: that.data.longitude,
        latitude: that.data.latitude
      },
      success: res => {
        console.log("初始化成功");
      },
      fail: err => {
        console.log("初始化失败");
      }
    })
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
    wx.cloud.callFunction({
      name: 'deleteall',
      data: {},
      success: res => {
        console.log("退出成功");
      },
      fail: err => {
        console.log("退出失败");
      }
    })
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
  //向服务器发送状态 2代表求助
  onBtnclick_1: function () {
    wx.cloud.callFunction({
      name: 'test1',
      //发送经度 维度 状态
      data: {
        status: 2
      },
      success: res => {
        this.setData({
          status: 2
        })
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
  onBtnclick_2: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'test1',
      //发送经度 维度 状态
      data: {
        status: 3
      },
      success: res => {
        this.setData({
          status: 3
        })
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
  },
  //定位到自己的位置 并向服务器发送自己的位置
  setlocal: function () {
    console.log("in");
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
    // this.sendpos();
  },
  //获取自己的位置信息
  getpos: function () {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        // var latitude = res.latitude;
        // var longitude = res.longitude;
        //console.log(res.latitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
  },
  //向服务器发送位置
  sendpos: function () {
    var that = this;
    this.getpos();
    wx.cloud.callFunction({
      name: 'test3',
      //发送经度 维度 状态
      data: {
        longitude: that.data.longitude,
        latitude: that.data.latitude
      },
      success: res => {
        console.log("上传位置");
      },
      fail: err => {
        console.log("上传失败");
      }
    })
  },
  //导航到target
  get_mask_navigateTo: function () {
    let plugin = requirePlugin('routePlan');
    let key = 'OUJBZ-KGR6U-H3OVS-2GLWY-FNU73-KKBXB'; //使用在腾讯位置服务申请的key
    let referer = '口罩互助'; //调用插件的app的名称
    let endPoint = JSON.stringify({ //终点
      'name': '提供口罩的好心人',
      'latitude': this.data.target_latitude,
      'longitude': this.data.target_longitude
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },

  //设定导航目标的经度纬度
  setTargetLocation: function (latitude, longitude) {
    this.setData({
      target_latitude: latitude,
      target_longitude: longitude
    });
  },
  navigator: function () {
    //gettarget();
    this.get_mask_navigateTo();
  },
  //获取所有点的数据
  getpoints: function () {}
})