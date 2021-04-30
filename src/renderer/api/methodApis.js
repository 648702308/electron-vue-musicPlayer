import request from '@/utils/request'
import qs from 'qs'
/**
 * formData post请求
 * @param data
 */
export function formData(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}

/**
 * postJson post请求
 * @param url
 * @param data
 */
export function postJson(url, data) {
  return request({
    url: url,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

/**
 * post 请求
 * @param url
 * @param data
 */
export function post(url, data) {
  for (const key in data) {
    if (!data[key]) {
      data[key] = null
    }
  }
  return request({
    url: url,
    method: 'post',
    data: qs.stringify(data, { indices: false, skipNulls: true })
  })
}

/**
 * get 请求
 * @param url
 * @param data
 */
export function get(url, data) {
  for (let key in data) {
    if (!data[key]) {
      data[key] = null
    }
  }
  return request({
    url: url,
    method: 'get',
    params: qs.parse(qs.stringify(data, { indices: false, skipNulls: true })),
    paramsSerializer: function(params) { // axios怎么传一个数组  去掉中括号
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

/**
 * delete 请求
 * @param url
 * @param data
 */
export function remove(url, data) {
  return request({
    url: url,
    method: 'delete',
    params: data,
    paramsSerializer: function(params) { // axios怎么传一个数组  去掉中括号
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

/**
 * putJson put请求
 * @param url
 * @param data
 */
export function putJson(url, data) {
  return request({
    url: url,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data
  })
}

/**
 * put 请求
 * @param url
 * @param data
 */
export function put(url, data) {
  return request({
    url: url,
    method: 'put',
    data: qs.stringify(data, { indices: false, skipNulls: true })
  })
}

/**
 * 下载文件
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function postFile(url, data) {
  return request({
    url: url,
    method: 'post',
    data: qs.stringify(data, { indices: false }),
    responseType: 'blob'
  })
}
