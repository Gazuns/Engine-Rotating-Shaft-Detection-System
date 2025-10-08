import request from '@/utils/requestRedirect'

const BASE_URL = '/order'

export function getList() {
  return request({
    url: `${BASE_URL}/all`,
    method: 'get'
  })
}

export function getPartList(dire) {
  return request({
    url: `${BASE_URL}/queryall`,
    method: 'get',
    params: { dire }
  })
}

export function getOrder(id) {
  return request({
    url: `${BASE_URL}/query`,
    method: 'get',
    params: { id }
  })
}

export function addOrder(id, buyer, num, dire, type, cTime) {
  return request({
    url: `${BASE_URL}/add`,
    method: 'post',
    params: { id, buyer, num, dire, type, cTime }
  })
}

export function updateOrder(id, buyer, num, dire, type, cTime) {
  return request({
    url: `${BASE_URL}/update`,
    method: 'post',
    params: { id, buyer, num, dire, type, cTime }
  })
}

export function deleteOrder(id) {
  return request({
    url: `${BASE_URL}/delete`,
    method: 'post',
    params: { id }
  })
}
