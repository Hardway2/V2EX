var Api = require('../../utils/api.js');

Page({

  data: {
    topics: [],
  },

  onLoad: function (options) {
    this.requestData(options.id);
  },

  showUserAction(e) {
    wx.navigateTo({
      url: '../members/members?id=' + e.currentTarget.id,
    })
  },
  
  requestData(id) {
    wx.showToast({
      title: '加载中...',
      icon: "loading",
      duration: 10000
    })
    var that = this;
    wx.request({
      url: Api.getTopicInfo({
        node_id: id
      }),
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
      path: '/pages/topics/topics'
    }
  }

})