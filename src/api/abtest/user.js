import request from '@/utils/ab_request'

export function ab_login(data) {
  return request({
    url: '/login',
    method: 'GET',
    params: data
  })
}
