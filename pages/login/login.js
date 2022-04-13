// pages/info/info.js
var app = getApp();
import {
  getUserInfoApi,editWx,getLogin
} from '../../api/home.js'
import WxValidate from '../../utils/WxValidate.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      openid:app.globalData.openid,
      stuid:'',
      password:'',
  },

  //wx.validate初始化
  initValidate() {
    const rules = {
      stuid: {
        required: true,
        minlength: 4,
      },
      password: {
        required: true,
        minlength: 6,
      },
    }
    const messages = {
      stuid: {
        required: "请输入正确的SID号",
        minlength:"请输入不少于4位的正确SID号"
      },
      password: {
        required: '请输入密码',
        minlength:'密码长度不小于6位'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  formSubmit(e) {
      var that = this
      var subData = e.detail.value
      //加入openid数据
      subData["openid"] = wx.getStorageSync('openid')
      const params = subData
      console.log("表单打印",params)
      if (!that.WxValidate.checkForm(params)) {
        const error = that.WxValidate.errorList[0]
        that.showModal(error)
        return false
      } else {
        //数据上传后端
        wx.showLoading({
          title: '登录中',
        })
        wx.hideLoading()
        wx.getSetting({
          success: (response) => {
            console.log("用户授权测试",response)
            if (!response.authSetting['scope.userInfo']) {
              wx.authorize({
                scope: 'scope.userInfo',
                success: () => {
                  console.log('yes')
                }
              })
            }else{
              console.log("登录")
              this.getLogin(params);
            }
          }
        })
      }
  },

  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  /**
   * 获取当前用户信息;用于回显
   */
  async getInfo(){
    let that = this;
    let parm = {
      openid:app.globalData.openid
    }
    let res = await getUserInfoApi(parm);
    if (res.data && res.code == 200) {
      //console.log("修改用户数据界面传回数据",res)
      //如果数据变化，需要页面也变化，需要setData
      if(res.data.sex=="男"){
        that.setData({
          sexchecked:true
        })
      }else{
        that.setData({
          sexchecked:false
        })
      }
      that.setData({
        grade:res.data.grade,
        classes:res.data.classes,
        name:res.data.name,
        stuid:res.data.stuid,
        sex:res.data.sex,
        age:res.data.age,
      })
      wx.setStorageSync('initCode', '200')
    }
  },
  /**
   * 修改学生信息资料
   */
  async getLogin(param){
    let that=this;
    //提交修改后的学生信息
    let res = await getLogin(param);
    console.log(res);
    if(res && res.code == 200){
      console.log("登录结果",res);
      app.globalData.age = res.data.age;
      app.globalData.classes = res.data.classes;
      app.globalData.grade = res.data.grade;
      app.globalData.name = res.data.name;
      app.globalData.openid = res.data.openid;
      app.globalData.school = res.data.school;
      app.globalData.sex = res.data.sex;
      app.globalData.stuid = res.data.stuid;
      wx.setStorageSync('openid', res.data.openid)
      wx.showToast({
        title: '提交成功',
      })
      wx.switchTab({
        url: '/pages/home/home',
      })
    }else{
      console.log("登录结果",res)
      wx.showToast({
        title: res.msg,
        icon:'error'
      })
    }
  },
  sexChange(e) {
    //console.log("性别更改",e.detail.value)
    if (e.detail.value == true) {
      this.setData({
        'sex': '男'
      })
    } else {
      this.setData({
        'sex': '女'
      })
    }
  },
  inputStuId(e){
    this.setData({'stuid':e.detail.value})
  },
  inputPassword(e){
    this.setData({'password':e.detail.value})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // that.data.school = option.school;
    // console.log(options);
    this.initValidate();
    this.getInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})