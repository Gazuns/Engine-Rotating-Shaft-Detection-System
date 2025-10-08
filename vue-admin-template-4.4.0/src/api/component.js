import request from '@/utils/requestRedirect'

const BASE_URL = '/component'

export function getList() {
  return request({
    url: `${BASE_URL}/all`,
    method: 'get'
  })
}

export function getComponent(type) {
  return request({
    url: `${BASE_URL}/query`,
    method: 'get',
    params: { type }
  })
}

export function addComponent(type, name, num) {
  return request({
    url: `${BASE_URL}/add`,
    method: 'post',
    params: { type, name, num }
  })
}

export function updateComponent(type, name, num) {
  return request({
    url: `${BASE_URL}/update`,
    method: 'post',
    params: { type, name, num }
  })
}

export function deleteComponent(type) {
  return request({
    url: `${BASE_URL}/delete`,
    method: 'post',
    params: { type }
  })
}
