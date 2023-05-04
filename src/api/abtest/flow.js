import request from '@/utils/ab_request'

export function flowRequest(data) {
  return request({
    url: '/flow',
    method: 'GET',
    params: data
  })
}
