var Util = require('../../utils/util.js');
var Api = require('../../utils/api.js');

Page({

  data: {
    detail: {},
    replies: []
  },

  onLoad: function (options) {
    this.requestData(options.id);
  },

  showUserAction(e) {
    wx.navigateTo({
      url: '../members/members?id=' + e.currentTarget.id,
    })
  },

  showNodeAction(e) {
    wx.navigateTo({
      url: '../topics/topics?id=' + e.currentTarget.id,
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
        id: id
      }),
      success(res) {
        console.log(res.data);
        res.data[0].created = Util.formatTime(Util.transLocalTime(res.data[0].created))
        that.setData({
          detail: res.data[0]
        })
      }
    })
    
    wx.request({
      url: Api.getReplies({
        topic_id: id
      }),
      success(res){
        wx.hideToast();
        console.log(res.data);
        res.data.forEach(function (item) {
          item.created = Util.formatTime(Util.transLocalTime(item.created));
        })
        that.setData({
          replies: res.data
        })
      }
    })
  },

  onShareAppMessage(res) {
    return {
      title: 'Hardway邀请您看看小程序',
      path: '/pages/detail/detail'
    }
  }

})