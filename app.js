// app.js
App({
  onLaunch() {
    let that = this;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // //console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: that.globalData.url+'/wxpai/login/wxLogin', //请求的接口地址
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success (res) {
            console.log("登录获得数据",res.data)
            if(res.data.code == 200){
              if(res.data.data.openid){
                //console.log("res",res);
                // //console.log(res.data)
                that.globalData.openid = res.data.data.openid
                that.globalData.session_key = res.data.data.session_key
                wx.setStorageSync('openid', res.data.data.openid)
                //console.log("调用登陆成功,全局变量-->",that.globalData)
                // wx.request({
                //   url: that.globalData.url+'/wxapi/wxuser/fristEnterWx', //仅为示例，并非真实的接口地址
                //   data: {
                //     openid:res.data.data.openid
                //   },
                //   header: {
                //     'content-type': 'application/json' // 默认值
                //   },
                //   success (res) {
                //     that.globalData.initCode = res.data.code
                //     wx.setStorageSync('initCode', res.data.code)
                //     if(res.data.code == 500){
                //       wx.reLaunch({
                //         url: '/pages/info/info',
                //       })
                //     }
                //   }
                // })
              }
            }
          }
        })
      }
    })
    
  },
  
  //是全局的数据存储
  globalData: {
    userInfo: null,
    // url:'http://192.168.1.102:8099', //真实上线是一个域名
    url:'https://starrykii.club:8099', //真实上线是一个域名
    //用户信息
    age:'',
    classes:'',
    grade:'',
    name:'',
    school:'',
    sex:'',
    stuid:'',
    //鉴权相关
    openid:'',
    session_key:'',
    token:'',
    initCode:''
  }
})
