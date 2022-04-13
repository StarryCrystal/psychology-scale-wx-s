import {
  getMyQuestionListApi,getUserInfoApi
} from '../../api/home'
//获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{
        openid:app.globalData.openid,
        grade:'',
        classes:'',
        name:'',
        stuid:'',
        sex:'',
        age:'',
    },
    total: 0,
    //获取列表参数
    parms: {
      currentPage: 1,
      pageSize: 10,
      openid: wx.getStorageSync('openid')
    },
    //列表数据
    tableList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    //console.log('我的野蛮')
    //console.log(app.globalData.openid)
  },

  toMyinfo(){
    wx.navigateTo({
      url: '../info/info',
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
    if (res && res.code == 200) {
      //console.log("我的页面数据请求成功",res)
      //如果数据变化，需要页面也变化，需要setData
      that.setData({
        userinfo: res.data
      })
      //console.log(that.data.userinfo)
    }
  },
  //获取问卷列表
  async getQuestionList() {
    let that = this;
    //console.log(this.data.total)
    this.data.parms.openid = wx.getStorageSync('openid');
    let res = await getMyQuestionListApi(this.data.parms);
    //console.log(res)
    if (res && res.code == 200) {
      //注意，赋值不能使用this.data.的方式赋值，这样没有双向数据绑定的效果，虽然有数据，但是页面不会改变
      that.setData({
        tableList: that.data.tableList.concat(res.data.records),
        total: res.data.total
      })
      // that.data.parms.total = res.data.total;
      //console.log(res.data.total)
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
    this.setData({
      tableList:[],
      total:0
    })
   //获取问卷列表
   this.getQuestionList();
   //获取用户信息
   this.getInfo();
   //停止下拉刷新
   wx.stopPullDownRefresh(); 
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
    //console.log('下拉刷新了')
    this.data.parms.currentPage = 1;
    this.data.tableList = [];
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //console.log('上拉刷新了')
    let that = this;
    let totalPage = Math.ceil(that.data.total / that.data.parms.pageSize);
    if (that.data.parms.currentPage >= totalPage) {
      //如果data中的当前页数大于等于总页数，则没有下一页啦
      wx.showToast({
        title: '没有更多数据了',
      })
    } else {
      that.setData({
        currentPage: that.data.parms.currentPage++
      })
      //console.log(this.data.parms)
      that.onLoad();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //跳转到详情页
  gotoDetail:function(e) {
    //console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
     url:'../myanswer/index?questionId='+e.currentTarget.dataset.item.questionId
    })
  }
})