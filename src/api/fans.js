import request from '@/utils/request'
export const fansList = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params
  })
}
