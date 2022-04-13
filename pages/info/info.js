// pages/info/info.js
var app = getApp();
import {
  getUserInfoApi,editWx,getClassList,getGradeList
} from '../../api/home.js'
import WxValidate from '../../utils/WxValidate.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      openid:app.globalData.openid,
      grade:'一年级',
      classes:'1班',
      name:'',
      stuid:'',
      sex:'男',
      sexchecked:true,
      age:'',
      password:'',
      trueCode:null,
      trueTel:null,
      arrayClass: ['1班', '2班', '3班', '4班', '5班', '6班', '7班', '8班', '9班', '10班', '11班', '12班', '13班', '14班', '15班', '16班', '17班', '18班', '19班', '20班'],
      indexClass: 0,
      arrayGrade: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '七年级', '八年级', '九年级'],
      indexGrade: 0,
  },

  //wx.validate初始化
  initValidate() {
    const rules = {
      // name: {
      //   required: true,
      //   minlength: 2,
      // },
      // stuid: {
      //   required: true,
      //   minlength: 4,
      // },
      classes: {
        required: true,
        minlength: 2,
      },
      grade: {
        required: true,
        minlength: 2,
      },
      sex: {
        required: true,
      },
      age: {
        required: true,
        min:6,
        max:22
      },
      password: {
        minlength: 6
      }
    }
    const messages = {
      // name: {
      //   required: '请输入姓名',
      // },
      // stuid: {
      //   required: "请输入ID号",
      //   minlength:"请输入不少于4位的ID号"
      // },
      classes: {
        required: '请选择正确的班级号',
      },
      grade: {
        required: '请选择正确的年级',
      },
      sex: {
        required: '请选择正确的性别',
      },
      age: {
        required: '请输入正确的年龄',
        min: '年龄不小于6',
        max: '年龄不大于22',
      },
      password: {
        minlength: '密码位数不少于6位'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  formSubmit(e) {
      var that = this
      var subData = e.detail.value
      //加入性别和openid数据
      subData["sex"] = this.data.sex
      subData["classes"] = this.data.classes
      subData["grade"] = this.data.grade
      subData["openid"] = wx.getStorageSync('openid')
      const params = subData
      //console.log("表单打印",params)
      if (!that.WxValidate.checkForm(params)) {
        const error = that.WxValidate.errorList[0]
        that.showModal(error)
        return false
      } else {
        //console.log(params)
        // app.globalData.NAME = params.name
        // app.globalData.SEX = params.sex
        // app.globalData.STUNUM = params.stu
        // app.globalData.TEL = params.tel
        // wx.setStorageSync('name', app.globalData.NAME)
        // wx.setStorageSync('sex', app.globalData.SEX)
        // wx.setStorageSync('stuNum', app.globalData.STUNUM)
        // wx.setStorageSync('tel', app.globalData.TEL)
        //数据上传后端
        wx.showLoading({
          title: '发送中',
        })
        this.editWx(params);
        wx.hideLoading()
        wx.showToast({
          title: '提交成功',
        })
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
  },
  async getGrade(){
    let that=this;
    //提交修改后的学生信息
    let res = await getGradeList();
    console.log(res);
    if(res && res.code == 200){
      console.log("年级列表查询结果",res);
      that.setData({
        arrayGrade:res.data
      })
    }else{
      console.log("年级列表查询结果",res)
      wx.showToast({
        title: res.msg,
        icon:'error'
      })
    }
  },
  async getClass(){
    let that=this;
    //提交修改后的学生信息
    let res = await getClassList();
    console.log(res);
    if(res && res.code == 200){
      console.log("班级列表查询结果",res);
      that.setData({
        arrayClass:res.data
      })
    }else{
      console.log("班级列表查询结果",res)
      wx.showToast({
        title: res.msg,
        icon:'error'
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
  async editWx(param){
    let that=this;
    //console.log("更改前-->",param)
    //测试  把当前data里的userinfo数据修改 
    // this.setData({
    //   userinfo:{
    //     openid:'ov_hj5WShWnjoEA9cG2LmK-Pi_Xo',
    //     name:'小叶',
    //     school:'重庆文理',
    //     grade:'19级',
    //     classes:'软1',
    //     stuid:'20195830'
    //   }
    // })
    //提交修改后的学生信息
    let res = await editWx(param);
    if(res && res.code == 200){
      // console.log("修改用户信息的后端返回数据--",res);
      //刷新当前页面
      this.getInfo();
      wx.setStorageSync('initcode', 200);
      app.globalData.initCode = 200;
      //console.log("更改后-->",this.data.userinfo)
    }else{
      //console.log("错误",res);
    }
  },
  sendVeriCode(){
    if(this.data.phone){
      wx.showLoading({
        title: '验证码发送中',
      })
      var that = this
      wx.request({
        url: 'https://tang.newif.cn/psychology/vericode',
        data: { 'type': 'get_vericode', 'phone': this.data.phone },
        method: 'GET',
        header: { 'content-type': 'application/json' },
        success(res) {
          that.setData({ 
            'trueCode': res.data.vericode,
            'trueTel':res.data.phoneNum
           })
          //console.log(that.data.trueCode)
          wx.hideLoading()
        }
      })
    }else{
      wx.showToast({
        title: '请输入手机号',
        icon:'none',
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
  bindPickerChangeClass: function(e) {
    let that=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var classTemp = that.data.arrayClass[e.detail.value]
    console.log("班级是",classTemp)
    this.setData({'classes':classTemp})
  },
  bindPickerChangeGrade: function(e) {
    let that=this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var gradeTemp = that.data.arrayGrade[e.detail.value]
    console.log("年级是",gradeTemp)
    this.setData({'grade':gradeTemp})
  },
  inputStuId(e){
    this.setData({'stuid':e.detail.value})
  },
  inputName(e){
    this.setData({'name':e.detail.value})
  },

  inputSchool(e){
    this.setData({'school':e.detail.value})
  },

  inputGrade(e) {
    this.setData({'grade':e.detail.value})
  },

  inputClass(e) {
    this.setData({'classes':e.detail.value})
  },
  inputAge(e) {
    this.setData({'age':e.detail.value})
  },
  inputPassword(e) {
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
    this.getGrade();
    this.getClass();
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