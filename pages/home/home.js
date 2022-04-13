// pages/home/home.js
//引入api 
const app = getApp();
import {
  getHomeListApi,fristEnterWx
} from '../../api/home.js'
import { imgUrl } from './images.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgData:'',
    total: 0, //分页总条数
    initCode:'',
    parms: {
      currentPage: 1, //从第几页开始
      pageSize: 10 //每页查询的条数
    },
    tableList: [], //列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log("open",app.globalData.openid);
    //console.log('执行onload')
    //获取用户是否绑定信息
    //获取数据列表
    this.getHomeListApi();
    //数据加载完，停止下拉刷新
    wx.stopPullDownRefresh();
    if(options.scene){
      let scence = decodeURIComponent(options.scene)
      let questionId=scence.split("&")[0];
      let questionStatus=scence.split("&")[1];
      //console.log(questionId)
      if(questionStatus=='0'){
        wx.reLaunch({
          url: 'url',
        })
      }
      wx.navigateTo({
        url: '../detail/index?questionId=' + questionId,
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
    //console.log('执行onshow')
    let that=this;
    // this.getfristEnterWxStatus();
    this.getImgUrl();
    // 检测数据是否存在，若存在则进入主页，不存在则进入认证界面
    //console.log("checkUserStatus",wx.getStorageSync('initcode'));
    // if (wx.getStorageSync('initcode')==200) {
    //   wx.switchTab({
    //     url: '/pages/home/home',
    //   })
    //   }else{
    //   wx.reLaunch({
    //     url: '/pages/info/info',
    //   })
    // }
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
  /**
   * 获取列表
   */
  async getHomeListApi() {
    let that = this;
    let res = await getHomeListApi(that.data.parms);
    if (res && res.code == 200) {
      //console.log(res)
      //返回成功，把值赋值到data里面
      //方式1 ： 数据不是响应式的，data里面的数据发生变化，不会导致页面变化
      // that.data.tableList = res.data.records;
      // that.data.total = res.data.total;
      // //console.log(that.data)
      //方式2: 响应式的数据，页面会发生变化
      that.setData({
        total: res.data.total,
        tableList: that.data.tableList.concat(res.data.records)
      })
      //console.log(that.data)
    }
    
  },
  /**
   * 获取当前用户信息;用于回显
   */
  async getfristEnterWxStatus(){
    let that = this;
    let parm = {
      openid:app.globalData.openid
    }
    //console.log("查询用户是否第一次登录返回码传入码",parm);
    let res = await fristEnterWx(parm);
    console.log("查询用户是否第一次登录返回码",res)
    if (res && res.code == 200) {
      console.log("主页firstEnterWxStatus",res)
      //如果数据变化，需要页面也变化，需要setData
      that.setData({
        initCode: 200
      })
      wx.setStorageSync('initcode', 200);
      //console.log(that.data.userinfo)
    }else{
      that.setData({
        initCode: 500
      })
      // wx.redirectTo({
      //   url: '/pages/info/info',
      // })
      wx.setStorageSync('initcode', 500);
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
    //console.log('下拉刷新')
    //思路  从第一页开加载，把原来列表里面的数据清空
    this.data.parms.currentPage = 1;
    this.setData({
      tableList: []
    })
    //重新加载列表
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //console.log('上拉刷新')
    //判断是否还有下一页，如果有，继续加载数据；没有，停止加载，信息提示
    let that = this;
    //总页数
    let totalPage = Math.ceil(that.data.total / that.data.parms.pageSize);
    if (that.data.parms.currentPage >= totalPage) { //说明没有下一页
      //信息提示
      wx.showToast({
        title: '没有更多数据了',
      })
    } else {
      that.setData({
        currentPage: that.data.parms.currentPage++
      })
      //从新加载数据
      that.onLoad();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gotoDetail: function (e) {
    //console.log(e)
    wx.navigateTo({
      url: '../detail/index?questionId=' + e.currentTarget.dataset.questionid,
    })
  }
})