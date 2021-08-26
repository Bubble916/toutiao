import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [
    function(data) {
      try {
        return JSONbig.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
})

const refreshTokenRequest = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
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

request.interceptors.response.use(
  function(response) {
    return response
  },
  async function(error) {
    const status = error.response.status
    if (status === 400) {
      Toast.fail('客户端请求参数异常！')
    } else if (status === 401) {
      const { user } = store.state
      if (!user || !user.token) {
        return redirectLogin()
      }
      try {
        const { data } = await refreshTokenRequest({
          method: 'PUT',
          url: '/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        user.token = data.data.token
        store.commit('setUser', user)
        return request(error.config)
      } catch (error) {
        redirectLogin()
      }
    } else if (status === 403) {
      Toast.fail('没有给予权限！')
    } else if (status >= 500) {
      Toast.fail('服务端异常，不好意思！')
    }
    return Promise.reject(error)
  }
)

function redirectLogin(params) {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request
