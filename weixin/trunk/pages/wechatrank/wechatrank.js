var util = require('../../utils/util.js')
// pages/wechatrank/wechatrank.js
Page({
    data: {
        isForbidden:false,
        translate:'',
        //获取手机的宽度
        windowWidth:  wx.getSystemInfoSync().windowWidth,
        //浮窗
        model:util.base_qiniu_url+'/glyphicon_contact_white.png',
        //总榜箭头默认向下
        arrow:1,
        //snbt综合榜
        arrowSnbt:1,
        rank_cates: [
            {name: 'commercial_rank', value: '营销价值榜'},
            {name: 'hasoriginal_snbt_rank', value: '原创能力榜', checked: true},
            {name: 'favourite_rank', value: '广告主最爱榜'},
            {name: 'area_commercial_rank', value: '最热地域榜'},
        ],
        rank_cate_status: false,
        rank_child_cate_status: false,
        rank_cate_title: '',
        rank_child_cate_title: '',
        rank_child_cates: [],
        rank_list: [],
        rank_update_date: '',
        request_query: {
            resource_index: 'wechat_toplist',
            quest_source_id: 'wechat_toplist',
            rank: 'commercial_rank',
            size: 50,
            report_period_type: 'week',
            classification: '0',
        },
        error_tip: ''
    },
    //页面加载完成 获取参数 初始化处理
    onLoad: function (options) {
        this.data.request_query.rank = options.rank;
        this.setData({
            rank_cates: util.changeRadio(options.rank, this.data.rank_cates),
            rank_child_cates: util.getWechatCategoryNote(options.rank),
            rank_cate_title: util.getItemFromArrayObejct('name',options.rank,this.data.rank_cates).value,
            rank_child_cate_title: '不限分类'
        });
        this.requestRankList();
    },
    //筛选按钮点击事件
    rankBtnClick: function (e) {

        var id = e.target.id;
        if (id == 'rank-cate-btn') {
            this.setData({
                rank_child_cate_status: false,
                rank_cate_status: !this.data.rank_cate_status,
                arrowSnbt:!this.data.arrowSnbt,
                arrow:1
            })
        } else {
            this.setData({
                rank_cate_status: false,
                rank_child_cate_status: !this.data.rank_child_cate_status,
                arrow:!this.data.arrow,
                arrowSnbt:1
            })
        }

    },
    //下拉框点击事件
    radioChange: function (e) {
        var id = e.target.id;
        var value = e.detail.value;
        if (id == 'rank-cate-radio') {
            var request_query = util.replaceValueForObeject('rank', value, this.data.request_query);
            request_query = util.replaceValueForObeject('classification', "0", request_query);
            request_query = util.replaceValueForObeject('area_code', "0", request_query);
            request_query = util.replaceValueForObeject('quest_source_id', 'wechat_toplist', request_query);
            this.setData({
                rank_child_cates: util.getWechatCategoryNote(value),
                rank_cates: util.changeRadio(value, this.data.rank_cates),
                rank_child_cate_status: false,
                rank_cate_status: !this.data.rank_cate_status,
                request_query: request_query,
                arrowSnbt:1
            });
            this.requestRankList();
        } else {
            this.setData({
                rank_child_cates: util.changeRadio(value, this.data.rank_child_cates),
                rank_cate_status: false,
                rank_child_cate_status: !this.data.rank_child_cate_status,
                arrow:1
            });
            if (this.data.request_query.rank == 'area_commercial_rank') {
                this.setData({
                    request_query: util.replaceValueForObeject('quest_source_id', 'wechat_toplist_area', util.replaceValueForObeject('area_code', value, this.data.request_query))
                })
            } else {
                this.setData({
                    request_query: util.replaceValueForObeject('quest_source_id', 'wechat_toplist_classification', util.replaceValueForObeject('classification', value, this.data.request_query))
                })
            }
            //如果valuevalue == 0 quest_source_id = wechat_toplist
            if (value == "0") {
                this.setData({
                    request_query: util.replaceValueForObeject('quest_source_id', 'wechat_toplist', this.data.request_query)
                })
            }
            this.requestRankList();
        }
    },
    onShareAppMessage: function () {
        console.log('debug分享页面地址: '+'/pages/wechatrank/wechatrank?rank='+this.data.request_query.rank);
        return {
        title: '公众号TOP榜',
        desc: '微信公众号、映客、花椒、一直播....等各类自媒体榜单、画像、报价查询！',
        path: '/pages/wechatrank/wechatrank?rank='+this.data.request_query.rank
        }
    },
    //请求榜单数据
    requestRankList: function () {
        var that = this;
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })
        console.log('debug请求参数：'+JSON.stringify(that.data.request_query))
        wx.request({
            url: util.base_url + '/index/ranklist',
            data: that.data.request_query,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                var ranklist = res.data.data.rank_list;
                var rank_period = res.data.data.rank_period;
                if (res.data.code == 1000) {
                    that.setData({
                        rank_cate_title: util.getItemFromArrayObejct('checked', true, that.data.rank_cates).value,
                        rank_cates: util.replaceValueForArrayObeject('name', util.getItemFromArrayObejct('checked', true, that.data.rank_cates).name, 'css','colorF5',that.data.rank_cates),
                        rank_child_cate_title: util.getItemFromArrayObejct('checked', true, that.data.rank_child_cates).value,
                        rank_child_cates: util.replaceValueForArrayObeject('name', util.getItemFromArrayObejct('checked', true, that.data.rank_child_cates).name, 'css','colorF5',that.data.rank_child_cates),
                        rank_list: ranklist,
                        rank_update_date: rank_period[0]['rank_update_date'],
                        error_tip: ''
                    })
                }else{
                    that.setData({
                        error_tip: res.data.msg
                    })
                }
            },
            fail: function(){
                    that.setData({
                        error_tip: '请求失败,请稍后重试'
                    })
            },
            complete: function () {
                wx.hideToast();
            }
        })
    },
    //重新切换回来
    onShow:function () {
        this.setData({translate:'',isForbidden:false})
    },
    //跳转到留资页面
    handleJumpinfo:function () {
        var res = wx.getSystemInfoSync()
        if(res.version =='6.5.3'){
            this.setData({
                isForbidden:true,
                translate: 'transform: translateX('+this.data.windowWidth+'px)'
            })
            setTimeout(function () {
                wx.navigateTo({
                    url:'/pages/information/info',
                })
            },50)
        }else{
            this.setData({
                isForbidden:true,
                translate: 'transform: translateX('+this.data.windowWidth+'px)'
            },()=>{
                wx.navigateTo({
                    url:'/pages/information/info',
                })
            })
        }
    },
});