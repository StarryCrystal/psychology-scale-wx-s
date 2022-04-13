// pages/answer/index.js
const app = getApp();
import {
  getPaperListApi,
  saveCommitApi
} from '../../api/home.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionId: '',
    //试题数据列表
    paperList: [],
    //表单提交的数据
    answer: {
      openid: '',
      questionId: '',
      paperList: []
    },
    submitFlag:"1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      questionId: options.questionId
    })
    let parm = {
      questionId: options.questionId
    }
    this.getPaperList(parm);
  },
  async getPaperList(parm) {
    let that = this;
    let res = await getPaperListApi(parm);
    if (res && res.code == 200) {
      console.log(res)
      //如果数据变化，需要页面也变化，需要setData
      that.setData({
        paperList: res.data.listPaper
      })
      console.log(that.data.paperList)
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

  },
  selectChange(e) {
    // console.log(e)
    let that = this;
    //obj是试题信息和答案的存储
    let obj = {
      questionId: '',
      paperId: '',
      paperType: '',
      paperValue: '',
      paperCheck:'',
    }
    obj.questionId = that.data.questionId;
    obj.paperId = e.currentTarget.dataset.paperid;
    obj.paperType = e.currentTarget.dataset.papertype;
    obj.paperCheck = e.currentTarget.dataset.papercheck;
    //获取选中的值
    //多选的时候，需要把值设置为字符串
    if (e.currentTarget.dataset.papertype == '2') {
      obj.paperValue = e.detail.value.join(",");
    } else {
      obj.paperValue = e.detail.value;
    }
    //判断答卷是否存在
    let list = that.data.answer.paperList;
    if (list.length > 0) {
      //需要判断是否存在
      for (let i = 0; i < list.length; i++) {
        if (list[i].paperId === obj.paperId && list[i].paperType === obj.paperType) {
          //删除原来的
          list.splice(i, 1);
        }
      }
      //删除之后，把新的存进去
      list.push(obj);
    } else {
      list.push(obj);
    }
    console.log("list",list);
  },
  //问卷提交事件
  async submitBtn(e) {
    let that=this;
    that.setData({
      submitFlag:"0"
    })
    let res="";
    let flag=1;
    this.data.answer.openid = wx.getStorageSync('openid');
    this.data.answer.questionId = this.data.questionId;
    console.log(this.data.answer)
    console.log("提交长度:",this.data.answer.paperList.length);
    console.log("原长度:",this.data.paperList.length);
    if(this.data.answer.paperList.length == this.data.paperList.length){
      for(let t=0;t<this.data.answer.paperList.length;t++){
        if(this.data.answer.paperList[t].paperValue === null){
          flag=0;
        }
      }
    }else{
      flag=0;
    }
    if(flag==1){
      res = await saveCommitApi(this.data.answer);
    }else{
      flag=1;
      that.setData({
        submitFlag:"1"
      })
      wx.showToast({
        title: '填写不完整',
        icon:'error',
        duration:3000
      })
    }
    if (res && res.code == 200) {
      console.log(res)
      wx.navigateBack({
        delta:1
      })
    }else{
      console.log("无效答题");
      that.setData({
        submitFlag:"1"
      })
      wx.showModal({
        title:'问卷提交不成功',
        content:'该问卷过多无效选择,请修改后再提交。',
        showCancel:false,
        success:function(res){
          if(res.confirm){
            console.log("用户点击确定")
          }else if(res.cancel){
            console.log("用户取消操作")
          }
        }
      })
    }
  }
})