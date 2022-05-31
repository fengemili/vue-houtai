import { getPostList, getReplyList, sendArticle, sendReply, searchPostList, deletePost, deleteReply } from '../api/post/postList'
import moment from 'moment'

const state = {
  xinshou:[],
  //每个标签的总个数
  count: 0,
  replyList:[],
  searchPostList:[],
  //搜索得到的总个数
  searchCount: 0,
}

const mutations = {

  //获取文章列表
  GETPOSTLIST(state,xinshouList){
    state.count = xinshouList.articleCount
    let arr = xinshouList.articles

    //重命名函数
    let renameKEY = function( arr , oldname, newname ) {
      if(arr[oldname]){
      // console.log(Object.getOwnPropertyDescriptor(arr,oldname));
      Object.defineProperty(arr,newname,Object.getOwnPropertyDescriptor(arr,oldname))
      delete arr[oldname]
      }
    }
    //把作者发的文章列表的属性改名，方便渲染
    arr.forEach((item)=>{
      renameKEY(item,"rooter","author")
      moment.locale('zh-cn');
      item.createdAt = moment.utc(item.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    })
    console.log(arr);
    state.xinshou = arr
  },


  //获取回复列表
  GETREPLYLIST(state,replyList){
    let arr = replyList.comments
    let renameKEY = function( arr , oldname, newname ) {
      if(arr[oldname]){
      // console.log(Object.getOwnPropertyDescriptor(arr,oldname));
      Object.defineProperty(arr,newname,Object.getOwnPropertyDescriptor(arr,oldname))
      delete arr[oldname]
      }
    }
    //把作者发的回复的属性改名，方便渲染
    arr.forEach((item)=>renameKEY(item,"rooter","author"))
    state.replyList = arr
  },

  //获取搜索后的帖子列表
  SEARCHPOSTLIST(state,searchPostList){
    state.searchCount = searchPostList.articlesCount
    console.log(state.searchCount,88888);
    let arr = searchPostList.articles
    //重命名函数
    let renameKEY = function( arr , oldname, newname ) {
      if(arr[oldname]){
      // console.log(Object.getOwnPropertyDescriptor(arr,oldname));
      Object.defineProperty(arr,newname,Object.getOwnPropertyDescriptor(arr,oldname))
      delete arr[oldname]
      }
    }
    //把作者发的文章列表的属性改名，方便渲染
    arr.forEach((item)=>{
      renameKEY(item,"rooter","author")
      moment.locale('zh-cn');
      item.createdAt = moment.utc(item.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    })
    state.searchPostList = arr
  }


}

const actions = {
  //获取文章列表
  async getPostList({commit},data){
      const result = await getPostList(data) 
      console.log(result);
      if(result.status == 200){
        commit('GETPOSTLIST',result.data)
      }
      
  },

  //获取该帖子回复列表
  async getReplyList({commit},id){
    const result = await getReplyList(id)
    console.log(result,888);
    if(result.status == 200){
      commit('GETREPLYLIST',result.data)
    }
  },

  //管理员回复帖子
  async sendReply({commit},data){
    console.log(data);
    const result = await sendReply(data)
    console.log(result,789);
  },

  //管理员发送帖子
  async sendArticle({commit},data){
    const result = await sendArticle(data)
    console.log(result);
  },

  //管理员搜索帖子
  async searchPostList({commit},data){
    const result = await searchPostList(data)
    console.log(result,777777);
    if(result.status == 200){
      commit('SEARCHPOSTLIST',result.data)
    }
  },

  //管理员删除帖子
  async deletePost({commit},data) {
    const result = await deletePost(data)
    console.log(result);
  },

  //管理员删除回复
  async deleteReply({commit},data){
    const result = await deleteReply(data)
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
