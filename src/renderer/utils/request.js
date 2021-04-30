import axios from 'axios'
import {Message} from 'element-ui'
// create an axios instance
const service = axios.create({
  withCredentials: true,
  baseURL: `http://localhost:${process.env.WYY_PROXY_PORT}/`, // url = base url + request url
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
    return config
  }, error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      if(response.data.data.code===200){
        // 检查登陆状态
        console.log(response.data.data)
        return response.data.data
      }else{
        switch (response.data.code) {
          case 401: // 用户未登录
            break;
          default:
            console.log(response.data.msg);
            Message({
              message: response.data.msg || '未知错误',
              type: 'error',
              center: true
            })
            break;
        }
        return Promise.reject(response)
      }
    } else {
      console.log(response.data)
      return response.data
    }
  },
  error => {
    console.log(error) // for debug
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          break;
        case 401:
          error.message = '请求错误(401)';
          break;
        case 403:
          error.message = '拒绝访问(403)';
          break;
        case 404:
          error.message = '请求出错(404)';
          break;
        case 408:
          error.message = '请求超时(408)';
          break;
        case 500:
          error.message = '服务器错误(500)';
          break;
        case 501:
          error.message = '服务未实现(501)';
          break;
        case 502:
          error.message = '网络错误(502)';
          break;
        case 503:
          error.message = '服务不可用(503)';
          break;
        case 504:
          error.message = '网络超时(504)';
          break;
        case 505:
          error.message = 'HTTP版本不受支持(505)';
          break;
        default:
          error.message = `连接出错(${error.response.status})!`
      }
    } else {
      error.message = '连接服务器失败!'
    }
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
