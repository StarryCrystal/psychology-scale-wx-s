// pages/myinfo/myinfo.js
const app = getApp();
import {
  getUserInfoApi,editWx
} from '../../api/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userinfo:{
        openid:app.globalData.openid,
        school:'',
        grade:'',
        classes:'',
        name:'',
        stuid:'',
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getInfo();
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
    if (res && res.code == 200) {
      //console.log(res)
      //如果数据变化，需要页面也变化，需要setData
      that.setData({
        userinfo: res.data
      })
      //console.log(that.data.userinfo)
    }
  },

  /**
   * 修改学生信息资料
   */
  async editWx(){
    //console.log("更改前-->",this.data.userinfo)
    //测试  把当前data里的userinfo数据修改 
    this.setData({
      userinfo:{
        openid:'ov_hj5WShWnjoEA9cG2LmK-Pi_Xo',
        name:'小叶',
        school:'重庆文理',
        grade:'19级',
        classes:'软1',
        stuid:'20195830'
      }
    })
    //提交修改后的学生信息
    let res = await editWx(this.data.userinfo);
    if(res && res.code == 200){
      //console.log("修改用户信息的后端返回数据--",res);
      //刷新当前页面
      this.getInfo();
      //console.log("更改后-->",this.data.userinfo)
    }
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