//app.js
var util = require('utils/util.js');
App({
    onLaunch: function () {
        console.log('==========')
        wx.login({
            success: function(res) {
                console.log(res)
            }
        });
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('detail') || []
        logs.unshift(Date.now())
        wx.setStorageSync('detail', logs);
        wx.login({
            success: function(res) {
               console.log(res)
            }
        });
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            // wx.login({
            //     success: function (res) {
            //         if(res.code){
            //             wx.request({
            //                 url:util.base_url+'/user/get-session-key',
            //                 data:{
            //                     code: res.code
            //                 },
            //                 success(res){
            //                     if(res.data.code == 1000){
            //                         var openid = res.data.data;
            //                         this.getDetailUserInfo();
            //                     }
            //                 }
            //             })
            //         }
            //     }
            // })
        }
    },
    getDetailUserInfo: function(openid){
        var that = this
        wx.getUserInfo({
            success: function (res) {
                that.globalData.userInfo = res.userInfo;
                typeof cb == "function" && cb(that.globalData.userInfo);
            }
        })
    },
    globalData: {
        userInfo: null
    }
})