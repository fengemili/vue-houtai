import request from '@/utils/myrequest'

//管理员获取用户信息
export const getUserList = ()=>request({url:`/rooter/getUserList`,method: 'GET'})

//管理员改变用户发言状态
export const changeState = (data)=>request({url:`/rooter/changState`,method: 'POST',data})

//管理员搜索用户列表
export const searchUserList = (keyword)=>request({url:`/rooter/searchUserList/?keyword=${keyword}`,method: 'GET'})