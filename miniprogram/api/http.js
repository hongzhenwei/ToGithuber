const {token} = require('../config/secret.js')

const get = (url, { params = {} } = {}) => new Promise((resolve, reject) => {
  wx.cloud.callFunction({
    name: 'axios',
    data: {
      method: 'GET',
      url,
      headers: { 'Authorization': token },
      params
    }
  }).then(({ result: { status, headers = {}, data } }) => {
    resolve({ status, headers, data })
  }).catch(error => {
    reject(error)
  })
})

const put = (url, { params = {}, data = {} } = {}) => new Promise((resolve, reject) => {
  wx.cloud.callFunction({
    name: 'axios',
    data: {
      method: 'PUT',
      url,
      headers: { 'Authorization': token },
      params,
      data
    }
  }).then(({ result: { status, headers = {}, data } }) => {
    resolve({ status, headers, data })
  }).catch(error => {
    console.log('url = %o, error = %o', url, error)
    reject(error)
  })
})

const post = (url, { params = {}, data = {} } = {}) => new Promise((resolve, reject) => {
  wx.cloud.callFunction({
    name: 'axios',
    data: {
      method: 'POST',
      url,
      headers: { 'Authorization': token },
      params,
      data
    }
  }).then(({ result: { status, headers = {}, data } }) => {
    resolve({ status, headers, data })
  }).catch(error => {
    reject(error)
  })
})

const del = (url, { params = {} } = {}) => new Promise((resolve, reject) => {
  wx.cloud.callFunction({
    name: 'axios',
    data: {
      method: 'DELETE',
      url,
      headers: { 'Authorization': token },
      params
    }
  }).then(({ result: { status, headers = {}, data } }) => {
    resolve({ status, headers, data })
  }).catch(error => {
    reject(error)
  })
})

const patch = (url, { params = {} } = {}) => new Promise((resolve, reject) => {
  wx.cloud.callFunction({
    name: 'axios',
    data: {
      method: 'PATCH',
      url,
      headers: { 'Authorization': token },
      params
    }
  }).then(({ result: { status, headers = {}, data } }) => {
    resolve({ status, headers, data })
  }).catch(error => {
    reject(error)
  })
})

module.exports = {
  get, put, post, del, patch
}