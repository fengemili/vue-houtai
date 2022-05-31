import { sendVideo, getVideoList, sendMessage, getMessageList, searchVideoList, deleteVideo, deleteMessage } from '../api/video/videoList'
import moment from 'moment'

const state = {
    videoList:[],
    messageList:[],
    searchVideoList:[],
    //每个标签的个数
    count:0,
    //搜索后得到的个数
    searchCount:0
}

const mutations = {
    //获取视频列表
    GETVIDEOLIST(state,videoList){
        state.count = videoList.videoCount
        let arr = videoList.videos
        //时间格式化
        arr.forEach((item)=>{
            moment.locale('zh-cn');
            item.createdAt = moment.utc(item.createdAt).format('MMMM Do YYYY, h:mm:ss a');
        })
        state.videoList = arr
    },

    //获取视频留言列表
    GETMESSAGELIST(state,messageList){
        let arr = messageList
        //属性重命名函数
        let renameKEY = function( arr , oldname, newname ) {
            if(arr[oldname]){
            // console.log(Object.getOwnPropertyDescriptor(arr,oldname));
            Object.defineProperty(arr,newname,Object.getOwnPropertyDescriptor(arr,oldname))
            delete arr[oldname]
            }
        }
          //把留言表的管理员属性名修改为author，方便渲染
        arr.forEach((item)=>renameKEY(item,"rooter","author"))
        console.log(arr);
        state.messageList = arr
    },

    //获取视频搜索列表
    SEARCHVIDEOLIST(state,searchVideoList){
        state.searchCount = searchVideoList.videosCount
        let arr = searchVideoList.videos
        arr.forEach((item)=>{
            moment.locale('zh-cn');
            item.createdAt = moment.utc(item.createdAt).format('MMMM Do YYYY, h:mm:ss a');
        })
        state.searchVideoList = arr
    }

}

const actions = {
    //管理员上传视频
    async sendVideo({commit},data){
        const result = await sendVideo(data)
        console.log(result)
        
    },

    //获取视频上传列表
    async getVideoList({commit},data){
        const result = await getVideoList(data)
        console.log(result)
        if(result.status >=200 || result.status <=300){
            commit('GETVIDEOLIST',result.data)
        }
    },

    //管理员发送视频留言
    async sendMessage({commit},data){
        const result = await sendMessage(data)
        console.log(result)
    },

    //获取视频留言
    async getMessageList({commit},data){
        const result = await getMessageList(data)
        console.log(result);
        if(result.status >=200 || result.status <=300){
            commit('GETMESSAGELIST',result.data)
        }
    },

    //获取搜索视频列表
    async searchVideoList({commit},data){
        const result = await searchVideoList(data)
        console.log(result);
        if(result.status >=200 || result.status <=300){
            commit('SEARCHVIDEOLIST',result.data)
        }
    },

    //管理员删除视频
    async deleteVideo({commit},data){
        const result = await deleteVideo(data)
        console.log(result);
    },

    async deleteMessage({commit},data){
        const result = await deleteMessage(data)
        console.log(result);
    }

}

const getters = {}


export default {
    getters,
    state,
    mutations,
    actions,
  }