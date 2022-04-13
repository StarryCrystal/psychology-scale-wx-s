// pages/detail/index.js
const app = getApp();
import {
  getDetailsApi
} from '../../api/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionDesc: '',
    questionId: '',
    questionImg: '',
    questionTitle: '',
    questionStatus: '',
    status: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('详情页')
    //console.log(options)
    this.setData({
      questionId: options.questionId
    })
  },
  async getDetails() {
    let that = this;
    wx.showLoading({
      title: '获取题目中',
    })
    let parm = {
      questionId: that.data.questionId,
      openid: wx.getStorageSync('openid')
    }
    let res = await getDetailsApi(parm);
    if (res && res.code == 200) {
      wx.hideLoading()
      that.setData({
        questionDesc: res.data.questionDesc,
        questionId: res.data.questionId,
        questionImg: res.data.questionImg,
        questionTitle: res.data.questionTitle,
        questionStatus: res.data.questionStatus,
        status: res.data.status
      })
      if(res.data.questionStatus!='1'){
        that.setData({
          status: '3'
        })
      }
    }
    if(this.data.status=="0"){
      wx.showModal({
        title: '知情同意',
        content: '亲爱的同学：您好！以下是一些心理测量与评估问卷。心理测量与评估是临床工作的重要组成部分。为了更好的帮助到您，请您真实并且认真的完成测验，同时对自己的选择与行为负责。我们将严格遵守保密原则，对相关资料进行保密。若涉及保密例外相关情况，我们将与您充分地沟通说明。对于测验结果的解释与说明，您可自行查阅或联系心理中心，感谢您的配合。',
        confirmText:'同意',
        cancelText:'拒绝',
        success(res) {
          if (res.confirm) {
            
          } 
          else if (res.cancel) {
            wx.navigateBack({
              delta:1
            })
          }
        }
      })
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
    this.getDetails();
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

  },
  gotoAnswer: function (e) {
    //console.log(e)
    wx.navigateTo({
      url: '../answer/index?questionId=' + e.currentTarget.dataset.questionid,
    })
  },
  hasAnswer(e){
    wx.showToast({
      title: '您已答卷',
      duration:2000
    })
  },
  notOpen(e){
    wx.showToast({
      title: '该问卷暂未开放',
      icon:'error',
      duration:2000
    })
  }
})