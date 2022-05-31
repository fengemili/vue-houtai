import request from '@/utils/myrequest'

//获取新手列表
export const getPostList = (data) => request({url:`/articles/?tag=${data.tag}&limit=${data.limit}&offset=${data.offset}`,method: 'GET'})

//获取某一篇帖子的评论
export const getReplyList= (id) => request({url:`/comments/post/${id}`,method: 'GET'})

//管理员发送评论
export const sendReply= (data) => request({url:`/comments/post/send`,method:'POST',data})

//管理员发帖
export const sendArticle = (data) => request({url:`/articles/rootArticle`,method:'POST',data,headers: {'Content-Type': 'multipart/form-data'}})

//管理员搜索帖子
export const searchPostList = (data)=>request({url:`/rooter/searchArticles/?keyword=${data.keyword}&limit=${data.limit}&offset=${data.offset}`,method: 'GET'})

//管理员删除帖子
export const deletePost = (postId)=>request({url:`/rooter/deletepost/${postId}`,method: 'DELETE'})

//管理员删除留言
export const deleteReply = (replyId)=>request({url:`/rooter/deletereply/${replyId}`,method: 'DELETE'})