import request from '@/utils/myrequest'

//管理员上传视频
export const sendVideo = (data) => request({ url: '/video/uploadVideo', method: 'POST', data })

//获得上传视频的列表
export const getVideoList = (data) => request({ url: `/video/rootergetVideoList/?tag=${data.tag}&limit=${data.limit}&offset=${data.offset}`, method: 'GET' })

//管理员发布视频留言
export const sendMessage = (data) => request({ url: `/message/sendMessage`, method: 'POST', data })

//获取留言列表
export const getMessageList = (videoId) => request({ url: `/message/getMessageList/${videoId}`, method: 'GET' })

//管理员模糊搜索视频
export const searchVideoList = (data) => request({ url: `/rooter/searchVideo/?keyword=${data.keyword}&limit=${data.limit}&offset=${data.offset}`, method: 'GET' })

//管理员删除视频列表
export const deleteVideo = (videoId) => request({ url: `/rooter/deletevideo/${videoId}`, method: 'DELETE' })

//管理员删除视频留言
export const deleteMessage = (messageId) => request({ url: `/rooter/deletemessage/${messageId}`, method: 'DELETE' })