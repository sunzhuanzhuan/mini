//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        //刚刚开始的时候没有阴影
        num:99,
        wechat_nav_bg: [
            {
                address: util.base_qiniu_url+'/glyphicon_lightning.png',
                id: 'hasoriginal_snbt_rank',
                text: '原创能力榜',
                rankType:'wechat'
            },
            {address: util.base_qiniu_url+'/glyphicon_histogram.png', id: 'commercial_rank', text: '营销价值榜',rankType:'wechat'},
            {address: util.base_qiniu_url+'/glyphicon_addr_marker.png', id: 'area_commercial_rank', text: '最热地域榜',rankType:'wechat'},
            {address: util.base_qiniu_url+'/glyphicon_favorite.png', id: 'favourite_rank', text: '广告主最爱榜',rankType:'wechat'},
            {address: util.base_qiniu_url+'/glyphicon_live_talent.png', id: 'all_platform', text: '达人TOP榜',rankType:'live'},
            {address: util.base_qiniu_url+'/glyphicon_more.png', id: 'more', text: '更多',rankType:'more'}
        ]
    },
    //点击跳转进去到列表页
    toRankList: function (e) {
        this.setData({
            num:e.currentTarget.dataset.select
        })
        var that = this;
        setTimeout(function () {
            that.setData({
                num:99
            })
            var navId = e.currentTarget.dataset.navId;
            var rankType = e.currentTarget.dataset.rankType;
            var url = null;
            if (rankType == 'wechat') {
                url = '../wechatrank/wechatrank?rank=' + navId;
            } else if(rankType == 'live'){
                url = '../liverank/liverank?platform=' + navId;
            }else{
                url = '/pages/information/info';
            }
            wx.navigateTo({
                url: url,
                complete: function () {
                    console.log(url)
                }
            })
        },100)

    },
    onLoad: function () {
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    onShow:function(){
        this.setData({
            num: 99
        })
    },
    onShareAppMessage: function () {
        return {
        title: '自媒体TOP榜',
        desc: '微信公众号、映客、花椒、一直播....等各类自媒体榜单、画像、报价查询！',
        path: '/pages/index/index'
        }
    }
})
