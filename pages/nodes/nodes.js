var Api = require('../../utils/api.js');


Page({

  data: {
    topics: [],
  },

  onLoad: function (options) {
    this.requestData();
  },

  requestData() {
    wx.showToast({
      title: '加载中...',
      icon: "loading",
      duration: 10000
    })
    var that = this;
    wx.request({
      url: Api.getAllNode(),
      success(res) {
        wx.hideToast();
        console.log(res.data);
        that.setData({
          topics: res.data
        })
      }
    })
  },

  onShareAppMessage(res) {
    return {
      title: 'Hardway邀请您看看小程序',
      path: '/pages/nodes/nodes'
    }
  }

})