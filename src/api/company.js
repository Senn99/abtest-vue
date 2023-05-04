import request from '@/utils/ab_request'

export function updateFlightTraffic(data) {
  return request({
    url: '/flight/traffic',
    method: 'POST',
    data
  })
}

export function deleteLayer(layerId) {
  return request({
    url: '/company/layer/delete',
    method: 'POST',
    params: { 'layerId': layerId }
  })
}

export function editCreateApplyStatus2Refuse(apply_id) {
  return request({
    url: '/company/create/apply/refuse',
    method: 'POST',
    params: { 'apply_id': apply_id }
  })
}

export function editCreateApplyStatus2Agree(apply_id) {
  return request({
    url: '/company/create/apply/agree',
    method: 'POST',
    params: { 'apply_id': apply_id }
  })
}

export function fetchCreateApplyList() {
  return request({
    url: '/company/create/apply',
    method: 'GET'
  })
}

export function createCompany(data) {
  return request({
    url: '/company/create',
    method: 'POST',
    data
  })
}

export function addCompanyJoinApply(data) {
  return request({
    url: '/company/join/create',
    method: 'POST',
    data
  })
}

export function listAllCompany() {
  return request({
    url: '/companys',
    method: 'GET'
  })
}

export function addLayer(data) {
  return request({
    url: '/company/layer/create',
    method: 'POST',
    data
  })
}

export function fetchLayerList(companyId) {
  return request({
    url: '/company/layers?companyId=' + companyId,
    method: 'GET'
  })
}

export function getReflux(companyId) {
  return request({
    url: '/company/reflux?companyId=' + companyId,
    method: 'GET'
  })
}

export function fetchFlightList(query) {
  return request({
    url: '/company/flights',
    method: 'GET',
    params: query
  })
}

export function fetchFlightListWithFilter(query) {
  return request({
    url: '/flight/query',
    method: 'GET',
    params: query
  })
}

export function fetchUserList(query) {
  return request({
    url: '/company/users',
    method: 'GET',
    params: query
  })
}

export function editReflux(data) {
  return request({
    url: '/company/reflux/edit',
    method: 'POST',
    data
  })
}

export function editApplyStatus2Refuse(apply_id) {
  return request({
    url: '/company/join/apply/refuse',
    method: 'POST',
    params: { 'apply_id': apply_id }
  })
}

export function editApplyStatus2Agree(apply_id) {
  return request({
    url: '/company/join/apply/agree',
    method: 'POST',
    params: { 'apply_id': apply_id }
  })
}

export function fetchJoinApplyList(company_id) {
  return request({
    url: '/company/join/apply',
    method: 'GET',
    params: { 'company_id': company_id }
  })
}

export function fetchCompanyLayerList(company_id) {
  return request({
    url: '/company/layers',
    method: 'GET',
    params: { 'companyId': company_id }
  })
}

export function endFlight(flight_id) {
  return request({
    url: '/flight/status/end?flight_id=' + flight_id,
    method: 'GET'
  })
}

export function editFlightStatus2Test(flight_id) {
  return request({
    url: '/flight/status/test?flight_id=' + flight_id,
    method: 'GET'
  })
}

export function editFlightStatus2Run(flight_id) {
  return request({
    url: '/flight/status/run?flight_id=' + flight_id,
    method: 'GET'
  })
}

export function editFlightStatus2Pause(flight_id) {
  return request({
    url: '/flight/status/pause?flight_id=' + flight_id,
    method: 'GET'
  })
}

export function fetchFlightById(flight_id) {
  return request({
    url: '/flight',
    method: 'GET',
    params: { 'flight_id': flight_id }
  })
}

export function addFlight(data) {
  return request({
    url: '/flight',
    method: 'POST',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
