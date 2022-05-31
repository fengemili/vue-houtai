import { getUserList, changeState, searchUserList } from '../api/user/userList'
import moment from 'moment'

const state ={
    userList:[],
    searchUserList:[]
}

const mutations = {
    //获取用户列表
    GETUSERLIST(state,userList){
        let arr = userList.users
        //时间格式化
        arr.forEach(item =>{
            moment.locale('zh-cn');
            item.createdAt = moment.utc(item.createdAt).format('MMMM Do YYYY, h:mm:ss a');
        })
        console.log(arr);
        state.userList = arr
    },

    //获取搜索到的用户列表
    SEARCHUSERLIST(state,searchUserList){
        let arr = searchUserList.users
        //时间格式化
        arr.forEach(item =>{
            moment.locale('zh-cn');
            item.createdAt = moment.utc(item.createdAt).format('MMMM Do YYYY, h:mm:ss a');
        })
        console.log(arr);
        state.searchUserList = arr
    }
}

const actions = {
    //获取用户列表
    async getUserList({commit}){
        const result = await getUserList()
        console.log(result);
        if(result.status == 200){
            commit('GETUSERLIST',result.data)
        }
    },

    //改变用户状态
    async changeState({commit},data){
        const result = await changeState(data)
        console.log(result)
    },

    //获取搜索后的用户列表
    async searchUserList({commit},data){
        const result = await searchUserList(data)
        console.log(result)
        if(result.status == 200){
            commit('SEARCHUSERLIST',result.data)
        }
    }
}
const getters = {}

export default {
    getters,
    state,
    mutations,
    actions,
  }