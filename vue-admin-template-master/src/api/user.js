import request from '@/utils/request'
import requests from '@/utils/myrequest'

export function login(rooter) {
  return requests({
    url: '/rooter/login',
    method: 'POST',
    data:{rooter}
  })
}

export function getInfo(token) {
  return requests({
    url: '/rooter/rootuserinfo',
    method: 'get',
    data:{rooterId:token}
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
