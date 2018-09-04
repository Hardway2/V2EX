var Api = require('../../utils/api.js');

Page({

  data: {
    topics:[],
  },

  onLoad: function (options) {
    this.requestData();
  },

  showUserAction(e){
    wx.navigateTo({
      url: '../members/members?id=' + e.currentTarget.id,
    })
  },

  showNodeAction(e){
    wx.navigateTo({
      url: '../topics/topics?id=' + e.currentTarget.id,
    })
  },

  requestData(){
   wx.showToast({
     title: '加载中...',
     icon: "loading",
     duration: 10000
   })
   var that = this;
   wx.request({
     url: Api.getLatestTopic({
       p: 1
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

  onPullDownRefresh: function () {
    this.requestData();
  },

  onShareAppMessage(res){
    return {
      title: 'Hardway邀请您看看小程序',
      path: '/pages/latest/latest'
    }
  }
})