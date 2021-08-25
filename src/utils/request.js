import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [
    function(data) {
      try {
        return JSONbig.parse(data)
      } catch (err) {
        console.log('转换失败', err)
        return data
      }
    }
  ]
})

// axios请求拦截器
request.interceptors.request.use(
  function(config) {
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

export default request
