import request from '@/utils/request.js'

export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

export const send = data => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${data}`
  })
}

export const currentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

export const userArticle = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
