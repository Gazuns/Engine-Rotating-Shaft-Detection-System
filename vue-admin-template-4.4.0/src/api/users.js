import request from '@/utils/requestRedirect'

const BASE_URL = '/user'

export function getList() {
  return request({
    url: `${BASE_URL}/all`,
    method: 'get'
  })
}

export function getUser(id) {
  return request({
    url: `${BASE_URL}/query`,
    method: 'get',
    params: { id }
  })
}

export function addUser(id, name, password, auth) {
  return request({
    url: `${BASE_URL}/add`,
    method: 'post',
    params: { id, name, password, auth }
  })
}

export function updateUser(id, name, password, auth) {
  return request({
    url: `${BASE_URL}/update`,
    method: 'post',
    params: { id, name, password, auth }
  })
}

export function deleteUser(id) {
  return request({
    url: `${BASE_URL}/delete`,
    method: 'post',
    params: { id }
  })
}
