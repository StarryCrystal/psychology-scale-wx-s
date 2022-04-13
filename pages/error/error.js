// pages/error/error.js
import { imgUrl } from './images.js';
Page({

  /**
   * Page initial data
   */
  data: {
    imgData:'',
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.getImgUrl();
  },
  /**
   * 获取图片
   */
  async getImgUrl() {
    let that = this;
    let res = await imgUrl();
    // //console.log("图片变量",res)
    if (res != null) {
      that.setData({
        imgData:res
      })
    }
  },
  goBackHome(){
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },
  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})