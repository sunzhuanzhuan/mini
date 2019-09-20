var util = require('../../utils/util.js');
// pages/liverank/liverank.js
Page({
    data: {
        //手机跳转禁用按钮
        isForbidden:false,
        //获取手机的宽度
        windowWidth:  wx.getSystemInfoSync().windowWidth,
        translate: '',
        //总榜箭头默认向下
        arrow:1,
        //snbt综合榜
        arrowSnbt:1,
        //获取屏幕的高度
        windowHeight:'',
        //平台是否显示
        platIsShow:false,
        //女人
        women:util.base_qiniu_url+'/glyphicon_female.png',
        //浮窗
        model:util.base_qiniu_url+'/glyphicon_contact_white.png',
        //男人
        men:util.base_qiniu_url+'/glyphicon_male.png',
        rank_cates: [
            {name: 'live_account_snbt_rank', value: 'SNBT综合榜', checked: true},
            {name: 'live_account_contribution_boost_rank', value: '主播收入榜'},
            {name: 'live_account_followers_boost_rank', value: '粉丝增长榜'},
            {name: 'live_account_praises_boost_rank', value: '被赞次数榜'},
            {name: 'live_account_watch_avg_rank', value: '平均观看榜'},
            {name: 'live_account_duration_boost_rank', value: '直播时长榜'}
        ],
        platform_cates: [
            {
                address: util.base_qiniu_url+'/icon_all_platform.png',
                name: 'all_platform',
                value: '全平台',
                checked: true
            },
            {address: util.base_qiniu_url+'/icon_huajiao.png', name: 'huajiao', value: '花椒'},
            {address: util.base_qiniu_url+'/icon_yinke.png', name: 'inke', value: '映客'},
            {address: util.base_qiniu_url+'/icon_yizhibo.png', name: 'yizhibo', value: '一直播'},
            {address: util.base_qiniu_url+'/icon_meipai.png', name: 'meipai', value: '美拍'}
        ],
        rank_cate_status: false,
        rank_child_cate_status: false,
        rank_cate_title: 'SNBT综合榜',
        rank_child_cate_title: '总榜',
        rank_child_cates: [
            {name: 'day', value: '昨日榜'},
            {name: 'week', value: '上周榜'},
            {name: 'month', value: '月榜'},
            {name: 'total', value: '总榜', checked: true}
        ],
        rank_list: [],
        rank_update_date: '',
        request_query: {
            resource_index: 'live_toplist',
            quest_source_id: 'live_toplist',
            platform: 'all_platform',
            report_period_type: 'total',
            rank: 'live_account_snbt_rank',
            size: 50
        },
        error_tip: ''
    },
    //页面加载完成 获取参数 初始化处理
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    windowHeight:res.windowHeight
                })
            }
        })
        this.data.request_query.platform = options.platform;
        this.setData({
            rank_cates: util.getLiveRankCate(options.platform),
            rank_child_cates: util.getLivePeriodType('live_account_snbt_rank'),
            platform_cates: util.replaceValueForArrayObeject('name', options.platform, 'css', 'border-red-line', util.changeRadio(options.platform, this.data.platform_cates)),
        });
        this.requestRankList();
    },
    //滚动到页面的一般的时候平台消失
    handlePlatIsHidden(e){
        if(e.detail.scrollTop>this.data.windowHeight/2){
            this.setData({
                platIsShow:true
            })
        }else{
            this.setData({
                platIsShow:false
            })
        }

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
            this.setData({
                rank_cates: util.changeRadio(value, this.data.rank_cates),
                rank_child_cates: util.getLivePeriodType(value),
                rank_child_cate_status: false,
                rank_cate_status: !this.data.rank_cate_status,
                request_query: util.replaceValueForObeject('rank', value, this.data.request_query),
                arrowSnbt:1
            })
        } else {
            this.setData({
                rank_child_cates: util.changeRadio(value, this.data.rank_child_cates),
                rank_cate_status: false,
                rank_child_cate_status: !this.data.rank_child_cate_status,
                request_query: util.replaceValueForObeject('report_period_type', value, this.data.request_query),
                arrow:1
            })
        }
        this.requestRankList();
    },

    //选择不同的平台
    changePlatform: function (e) {
        var platform = e.currentTarget.dataset.name;
        this.setData({
            rank_cates: util.getLiveRankCate(platform),
            rank_child_cates: util.getLivePeriodType('live_account_snbt_rank'),
            request_query: util.replaceValueForObeject('rank', 'live_account_snbt_rank', this.data.request_query),
            request_query: util.replaceValueForObeject('report_period_type', 'total', this.data.request_query),
            request_query: util.replaceValueForObeject('platform', platform, this.data.request_query),
            platform_cates: util.replaceValueForArrayObeject('name', platform, 'css', 'border-red-line', this.data.platform_cates)
        });
        this.requestRankList();
    },
    onShareAppMessage: function () {
        console.log('debug分享页面地址: '+'/pages/liverank/liverank?platform='+this.data.request_query.platform);
        return {
        title: '直播达人TOP榜',
        desc: '微信公众号、映客、花椒、一直播....等各类自媒体榜单、画像、报价查询！',
        path: '/pages/liverank/liverank?platform='+this.data.request_query.platform
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
        console.log('debug请求参数：'+JSON.stringify(that.data.request_query));
        wx.request({
            url: util.base_url+'/index/ranklist',
            data: that.data.request_query,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                if (res.data.code == 1000) {
                    var ranklist = res.data.data.rank_list;
                    var rank_period = res.data.data.rank_period;
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
    onShow:function () {
        this.setData({translate:'',isForbidden:false})
    }
})