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

export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

export const cancelFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

export const getUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

export const updateUser = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
