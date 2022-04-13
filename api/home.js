//引入http
const http = require('../utils/http.js')
//获取列表
export async function getHomeListApi(parm){
  return await http.GET("/wxapi/home/getList",parm)
}
//查询问卷详情表
export async function getDetailsApi(parm){
  return await http.GET("/wxapi/home/getDetails",parm)
}
//根据问卷id查询试题列表
export async function getPaperListApi(parm){
  return await http.GET("/wxapi/home/getPaperList",parm)
}
//问卷提交
export async function saveCommitApi(parm){
  return await http.POST("/wxapi/home/saveCommit",parm)
}
//我的页面列表
export async function  getMyQuestionListApi(params) {
  return await http.GET("/wxapi/home/getMyQuestionList",params)
}
//试题回显
export async function getMyPaperListShowApi(params) {
  return await http.GET("/wxapi/home/getMyPaperListShow",params)
}

//获取学生信息
export async function getUserInfoApi(params) {
  return await http.GET("/wxapi/wxuser/getInfo",params)
}

//小程序端编辑用户资料完善资料
export async function editWx(parm){
  return await http.POST("/wxapi/wxuser/editWx",parm)
}

//该用户是否第一次进入登陆小程序
export async function fristEnterWx(params) {
  return await http.GET("/wxapi/wxuser/fristEnterWx",params)
}

//获取学校列表
export async function getSchoolList(condition,params) {
  return await http.GET("/wxapi/school/getSchoolListByName?schoolName="+condition,params)
}

//获取年级列表
export async function getGradeList() {
  return await http.GET("/wxapi/wxuser/getGradeList")
}

//获取班级列表
export async function getClassList() {
  return await http.GET("/wxapi/wxuser/getClassList")
}

//获取用户登录态
export async function getLogin(params) {
  return await http.POST("/wxpai/login/Login",params)
}