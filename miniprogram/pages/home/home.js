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
        _openid:"able1",
        iconPath: "../../images/position.png",
        latitude: 32.013,
        longitude: 118.72,
        width: 20, //图片显示宽度
        height: 20 //图片显示高度
      },
      {
        id: 1,
        _openid:"able1",
        iconPath: "../../images/position.png",
        latitude: 32.2,
        longitude: 118.73,
        width: 20,
        height: 20
      },
      {
        id: 2,
        _openid:"able1",
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
        console.log(err);
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
        longitude: this.data.longitude,
        latitude: this.data.latitude,
        status: 2
      },
      success: res => {
        this.setData({
          status: 2
        })
        console.log('callFunction test result: ', res.result.data),
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
        longitude: this.data.longitude,
        latitude: this.data.latitude,
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
  getpoints: function () {
    this.getpos();
    var that = this;
    wx.cloud.callFunction({
      name: 'getpoints',
      data: {
        longitude: this.data.longitude,
        latitude: this.data.latitude
      },
      success: res => {
        var json = [];
        res.result.data.forEach(function (item) {
          var temp = {};
          if (item.state === "1") {
            temp["id"] = json.length;
            temp["iconPath"] = "../../images/position.png"
            temp["longitude"] = item.location.coordinates[0];
            temp["latitude"] = item.location.coordinates[1];
            temp["width"] = 20;
            temp["height"] = 20;
            temp["_openid"] = item._openid;
            
            // iconPath: "../../images/position.png",
            // latitude: 32.013,
            // longitude: 118.72,
            // width: 20, //图片显示宽度
            // height: 20 //图片显示高度
          };
          json.push(temp);
        });
        that.setData({
          markers:json
        })
      },
      fail: err => {
        console.log("获取失败");
        console.log(err);
      }
    })
    this.send5();
  },
  //获取系统匹配的愿意帮助我的人
  send5: function () {
    console.log(this.data.markers)
    console.log("I am here")
    console.log(this.data.markers[0]._openid)
    for(var i=0;i<3&&i<this.data.markers.length;i++)
    {
      var that = this;
     // console.log(that.data)
      wx.cloud.callFunction({
        name:"hook_create",
        data:{
          helperid:that.data.markers[i]._openid
        },
        success: res => {
          //console.log(that.data.markers[i]._openid);
          console.log("上传成功");
        },
        fail: err => {
          //console.log(that.data.markers[i]._openid);
          //sconsole.log(err);
          console.log("上传失败");
        }

      })
    }
  },
  gettarget:function(){

  },
  //帮助者决定是否帮助某人
  decide: function () {

  }
})