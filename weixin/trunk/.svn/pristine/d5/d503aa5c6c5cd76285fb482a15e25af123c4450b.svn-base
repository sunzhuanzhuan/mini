//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        isName:true,
        isCompany:true,
        isPhone:true,
        isEmail:true,
        //禁用按钮
        isDisable:true,
        name:'',
        email:'',
        company:'',
        phone:'',
        edit:util.base_qiniu_url+'/glyphicon_edit.png'
    },
    //验证规则
    handleRequire:function (e) {
        if(e.currentTarget.dataset.requireType == 'name'){

            var regName=/^.{1,10}$/
            if(regName.test( e.detail.value)){
                this.setData({
                    isName:true,
                    name : e.detail.value
                })
            }else{
                this.setData({
                    isName:false,
                    name : e.detail.value
                })
            }
        }else if(e.currentTarget.dataset.requireType == 'company'){

            var regName=/^.{1,50}$/
            if(regName.test( e.detail.value)){
                this.setData({
                    isCompany:true,
                    company : e.detail.value
                })
            }else{
                this.setData({
                    isCompany:false,
                    company :e.detail.value
                })
            }
        }else if(e.currentTarget.dataset.requireType == 'phone'){

            var regName=/^(\d|-){5,15}$/
            if(regName.test( e.detail.value)){
                this.setData({
                    isPhone:true,
                    phone : e.detail.value

                })
            }else{
                this.setData({
                    isPhone:false,
                    phone : e.detail.value

                })
            }
        }else if(e.currentTarget.dataset.requireType == 'email'){

            var regName=/@/
            if(regName.test( e.detail.value)){
                this.setData({
                    isEmail:true,
                    email :e.detail.value
                })
            }else{
                this.setData({
                    isEmail:false,
                    email :e.detail.value
                })
            }
        }

        if(this.data.email !='' && this.data.phone !='' && this.data.company !='' && this.data.name !='' &&(this.data.isCompany== true)&&(this.data.isEmail== true)&&(this.data.isName== true)&&(this.data.isPhone== true) ){
            this.setData({ isDisable:false})

        }else{
            this.setData({ isDisable:true})
        }


    },
    //表单提交
    formSubmit:function (e) {
        this.setData({ isDisable:true})
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        wx.request({
            url:util.base_url+'/index/leave-comment',
            data: e.detail.value,
            success:function (res) {
                console.log(res.data)
                if(res.data.code == 1000){
                    wx.navigateTo({
                        url:'/pages/model/model'
                    })
                }else{
                    alert(res.data.msg)
                }
            },
            fail:function () {
                
            }
        })
    }
})
