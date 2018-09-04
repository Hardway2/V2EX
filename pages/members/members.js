var Util = require('../../utils/util.js');
var Api = require('../../utils/api.js');

Page({

  data: {
    userInfo:{}
  },

  onLoad: function (options) {
    this.requestData(options.id)
  },
 
  requestData(id) {
    wx.showToast({
      title: '加载中...',
      icon: "loading",
      duration: 10000
    })
    var that = this;
    wx.request({
      url: Api.getUserInfo({
        username: id
      }),
      success(res) {
        wx.hideToast();
        console.log(res.data);
        res.data.created = Util.formatTime(Util.transLocalTime(res.data.created))
        that.setData({
            userInfo:res.data
        })
      }
    }) 
  },

  onShareAppMessage(res) {
    return {
      title: 'Hardway邀请您看看小程序',
      path: '/pages/members/members'
    }
  
  }
})