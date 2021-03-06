var BASE_REQUEST_URL = 'https://api.weiboyi.com/miniapp';
//  var BASE_REQUEST_URL = 'http://192.168.100.141/miniapp';
var BASE_QINIU_DOMAIN = 'http://img.weiboyi.com/img/miniapp';
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function changeRadio(value, radioGroupArray) {
    for (var i = 0; i < radioGroupArray.length; i++) {
        if (radioGroupArray[i]['name'] == value) {
            radioGroupArray[i]['checked'] = true;
        } else {
            radioGroupArray[i]['checked'] = false;
        }
    }
    return radioGroupArray;
}

function replaceValueForObeject(key, value, object) {
    object[key] = value;
    return object;
}

function replaceValueForArrayObeject(findKey, findValue, setKey, setValue, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][findKey] == findValue) {
            array[i][setKey] = setValue;
        } else {
            array[i][setKey] = '';
        }
    }
    return array;
}

function getItemFromArrayObejct(key, value, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] == value) {
            return array[i];
        }
    }
}

function getWechatCategoryNote(rank) {
    var categorys = {
        'commercial_rank': [
            {name: '0', value: '不限分类', checked: true},
            {name: '3003', value: '母婴育儿', checked: false},
            {name: '3016', value: '家居', checked: false},
            {name: '3013', value: '美食', checked: false},
            {name: '3004', value: '美容美妆', checked: false},
            {name: '3005', value: '汽车', checked: false},
            {name: '3023', value: '宠物', checked: false},
            {name: '3006', value: '服饰搭配', checked: false},
            {name: '3020', value: '生活', checked: false},
            {name: '3024', value: '摄影', checked: false},
            {name: '3010', value: '娱乐影音', checked: false},
            {name: '3028', value: '旅游', checked: false},
            {name: '3002', value: '军事', checked: false},
            {name: '3014', value: '游戏/动漫', checked: false},
            {name: '3012', value: '财经', checked: false},
            {name: '3025', value: '营销', checked: false},
            {name: '3001', value: '3C数码', checked: false},
            {name: '3007', value: '文艺', checked: false},
            {name: '3026', value: '两性', checked: false},
            {name: '3011', value: '时尚潮流	', checked: false},
            {name: '3009', value: '情感心理', checked: false},
            {name: '3027', value: '运动健身', checked: false},
            {name: '3015', value: '健康/养生', checked: false},
            {name: '3008', value: '教育培训', checked: false},
            {name: '3018', value: '职场/管理', checked: false},
            {name: '3019', value: '笑话段子', checked: false},
            {name: '3029', value: '星座命理', checked: false},
            {name: '3021', value: '综合媒体', checked: false},
            {name: '3022', value: '新闻资讯', checked: false},
            {name: '3017', value: 'IT/互联网'},
        ],
        'hasoriginal_snbt_rank': [
            {name: '0', value: '不限分类', checked: true},
            {name: '3003', value: '母婴育儿', checked: false},
            {name: '3016', value: '家居', checked: false},
            {name: '3013', value: '美食', checked: false},
            {name: '3004', value: '美容美妆', checked: false},
            {name: '3005', value: '汽车', checked: false},
            {name: '3006', value: '服饰搭配', checked: false},
            {name: '3020', value: '生活', checked: false},
            {name: '3024', value: '摄影', checked: false},
            {name: '3010', value: '娱乐影音', checked: false},
            {name: '3028', value: '旅游', checked: false},
            {name: '3002', value: '军事', checked: false},
            {name: '3012', value: '财经', checked: false},
            {name: '3001', value: '3C数码', checked: false},
            {name: '3011', value: '时尚潮流 ', checked: false},
            {name: '3009', value: '情感心理', checked: false},
            {name: '3027', value: '运动健身', checked: false},
            {name: '3015', value: '健康/养生', checked: false},
            {name: '3019', value: '笑话段子', checked: false},
            {name: '3029', value: '星座命理', checked: false},
            {name: '3017', value: 'IT/互联网'},
        ],
        'favourite_rank': [
            {name: '0', value: '不限分类', checked: true},
            {name: '3003', value: '母婴育儿', checked: false},
            {name: '3016', value: '家居', checked: false},
            {name: '3013', value: '美食', checked: false},
            {name: '3004', value: '美容美妆', checked: false},
            {name: '3005', value: '汽车', checked: false},
            {name: '3006', value: '服饰搭配', checked: false},
            {name: '3020', value: '生活', checked: false},
            {name: '3024', value: '摄影', checked: false},
            {name: '3010', value: '娱乐影音', checked: false},
            {name: '3028', value: '旅游', checked: false},
            {name: '3014', value: '游戏/动漫', checked: false},
            {name: '3012', value: '财经', checked: false},
            {name: '3025', value: '营销', checked: false},
            {name: '3001', value: '3C数码', checked: false},
            {name: '3007', value: '文艺', checked: false},
            {name: '3011', value: '时尚潮流 ', checked: false},
            {name: '3009', value: '情感心理', checked: false},
            {name: '3027', value: '运动健身', checked: false},
            {name: '3015', value: '健康/养生', checked: false},
            {name: '3008', value: '教育培训', checked: false},
            {name: '3018', value: '职场/管理', checked: false},
            {name: '3019', value: '笑话段子', checked: false},
            {name: '3029', value: '星座命理', checked: false},
            {name: '3021', value: '综合媒体', checked: false},
            {name: '3022', value: '新闻资讯', checked: false},
            {name: '3017', value: 'IT/互联网'},
        ],
        'other_rank': [
            {name: '0', value: '不限分类', checked: true},
            {name: '3003', value: '母婴育儿', checked: false},
            {name: '3016', value: '家居', checked: false},
            {name: '3013', value: '美食', checked: false},
            {name: '3004', value: '美容美妆', checked: false},
            {name: '3005', value: '汽车', checked: false},
            {name: '3023', value: '宠物', checked: false},
            {name: '3006', value: '服饰搭配', checked: false},
            {name: '3020', value: '生活', checked: false},
            {name: '3024', value: '摄影', checked: false},
            {name: '3010', value: '娱乐影音', checked: false},
            {name: '3028', value: '旅游', checked: false},
            {name: '3002', value: '军事', checked: false},
            {name: '3014', value: '游戏/动漫', checked: false},
            {name: '3012', value: '财经', checked: false},
            {name: '3025', value: '营销', checked: false},
            {name: '3001', value: '3C数码', checked: false},
            {name: '3007', value: '文艺', checked: false},
            {name: '3026', value: '两性', checked: false},
            {name: '3011', value: '时尚潮流	', checked: false},
            {name: '3009', value: '情感心理', checked: false},
            {name: '3027', value: '运动健身', checked: false},
            {name: '3015', value: '健康/养生', checked: false},
            {name: '3008', value: '教育培训', checked: false},
            {name: '3018', value: '职场/管理', checked: false},
            {name: '3019', value: '笑话段子', checked: false},
            {name: '3029', value: '星座命理', checked: false},
            {name: '3021', value: '综合媒体', checked: false},
            {name: '3022', value: '新闻资讯', checked: false},
            {name: '3017', value: 'IT/互联网'},
        ],
        'area_commercial_rank': [
            {name: '0', value: '不限地域', checked: true},
            {name: '10101', value: '北京', checked: false},
            {name: '10124', value: '上海', checked: false},
            {name: '1010501', value: '广州', checked: false},
            {name: '1010502', value: '深圳', checked: false},
        ]
    }
    if (categorys[rank]) {
        return categorys[rank];
    } else {
        return categorys['other_rank'];
    }
}

function getLiveRankCate(platform){
    var categorys = {
        'inke': [
            {name: 'live_account_snbt_rank', value: 'SNBT综合榜', checked: true},
            {name: 'live_account_contribution_boost_rank', value: '主播收入榜'},
            {name: 'live_account_followers_boost_rank', value: '粉丝增长榜'},
            {name: 'live_account_watch_avg_rank', value: '平均观看榜'}
        ],
        'meipai': [
            {name: 'live_account_snbt_rank', value: 'SNBT综合榜', checked: true},
            {name: 'live_account_contribution_boost_rank', value: '主播收入榜'},
            {name: 'live_account_praises_boost_rank', value: '被赞次数榜'},
            {name: 'live_account_watch_avg_rank', value: '平均观看榜'},
            {name: 'live_account_duration_boost_rank', value: '直播时长榜'}
        ],
        'default': [
            {name: 'live_account_snbt_rank', value: 'SNBT综合榜', checked: true},
            {name: 'live_account_contribution_boost_rank', value: '主播收入榜'},
            {name: 'live_account_followers_boost_rank', value: '粉丝增长榜'},
            {name: 'live_account_praises_boost_rank', value: '被赞次数榜'},
            {name: 'live_account_watch_avg_rank', value: '平均观看榜'},
            {name: 'live_account_duration_boost_rank', value: '直播时长榜'}
        ]
    };
    if (categorys[platform]) {
        return categorys[platform];
    } else {
        return categorys['default'];
    }
}

function getLivePeriodType(rank){
    var categorys = {
        'live_account_snbt_rank': [
            {name: 'total', value: '总榜', checked: true}
        ],
        'default': [
            {name: 'day', value: '昨日榜'},
            {name: 'week', value: '上周榜'},
            {name: 'month', value: '月榜'},
            {name: 'total', value: '总榜', checked: true}
        ]
    }
    if (categorys[rank]) {
        return categorys[rank];
    } else {
        return categorys['default'];
    }
}

module.exports = {
    formatTime: formatTime,
    changeRadio: changeRadio,
    replaceValueForObeject: replaceValueForObeject,
    getItemFromArrayObejct: getItemFromArrayObejct,
    getWechatCategoryNote: getWechatCategoryNote,
    replaceValueForArrayObeject: replaceValueForArrayObeject,
    base_url: BASE_REQUEST_URL,
    base_qiniu_url: BASE_QINIU_DOMAIN,
    getLiveRankCate: getLiveRankCate,
    getLivePeriodType: getLivePeriodType
};
