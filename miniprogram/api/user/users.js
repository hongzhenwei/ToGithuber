const http = require('../http.js')
const util = require('../../utils/util.js')

const {
  token
} = require('../../config/secret.js')

const users = (username) => {
  return {
    repos: ({
        page = 1,
        per_page = 10
      }) =>
      new Promise((resolve, reject) => {
        const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}`
        http.get(url).then(({
          status,
          headers,
          data
        }) => {
          if (status !== 200) {
            reject(new Error(data))
          }
          const repos = data.map(it => {
            it.created_at = util.toReadableTime(it.created_at)
            it.updated_at = util.toReadableTime(it.updated_at)
            return it
          })
          resolve(repos)
        }).catch(error => {
          reject(error)
        })
      }),

    members: ({
      page = 1,
      per_page = 10
    }) =>
      new Promise((resolve, reject) => {
        const url = `https://api.github.com/orgs/${username}/public_members?page=${page}&per_page=${per_page}`
        http.get(url).then(({
          status,
          headers,
          data
        }) => {
          if (status !== 200) {
            reject(new Error(data))
          }
          const repos = data.map(it => {
            it.created_at = util.toReadableTime(it.created_at)
            it.updated_at = util.toReadableTime(it.updated_at)
            return it
          })
          resolve(repos)
        }).catch(error => {
          reject(error)
        })
      }),

    starred: ({
      page = 1,
      per_page = 10
    }) =>
      new Promise((resolve, reject) => {
        const url = `https://api.github.com/users/${username}/starred?page=${page}&per_page=${per_page}`
        http.get(url).then(({
          status,
          headers,
          data
        }) => {
          if (status !== 200) {
            reject(new Error(data))
          }
          const users = data.map(it => {
            it.created_at = util.toReadableTime(it.created_at)
            it.updated_at = util.toReadableTime(it.updated_at)
            return it
          })
          resolve(users)
        }).catch(error => {
          reject(error)
        })
      }),
    receivedEvents: ({
      page = 1,
      per_page = 10
    }) =>
      new Promise((resolve, reject) => {
        const url = `https://api.github.com/users/${username}/received_events?page=${page}&per_page=${per_page}`
        http.get(url).then(({
          status,
          headers,
          data
        }) => {
          if (status !== 200) {
            reject(new Error(data))
          }
          const users = data.map(it => {
            it.created_at = util.toReadableTime(it.created_at)
            it.updated_at = util.toReadableTime(it.updated_at)
            return it
          })
          resolve(users)
        }).catch(error => {
          reject(error)
        })
      }),
    orgs: () => new Promise((resolve, reject) => {
      const url = `https://api.github.com/users/${username}/orgs`
      http.get(url).then(({
        status,
        headers,
        data
      }) => {
        if (status !== 200) reject(new Error(data))
        resolve({
          orgs: data
        })
      }).catch(error => reject(error))
    }),
    followers: ({
      page = 1,
      per_page = 10
    }) => new Promise((resolve, reject) => {
        const url = `https://api.github.com/users/${username}/followers?page=${page}&per_page=${per_page}`
        console.log(url)

      http.get(url).then(({
        status,
        headers,
        data
      }) => {
        if (status !== 200) reject(new Error(data))
        resolve({
          followers: data
        })
      }).catch(error => reject(error))
    }),
    following: ({
      page = 1,
      per_page = 10
    }) => new Promise((resolve, reject) => {
      const url = `https://api.github.com/users/${username}/following?page=${page}&per_page=${per_page}`
      console.log(url)
      http.get(url).then(({
        status,
        headers,
        data
      }) => {
        console.log(data)
        if (status !== 200) reject(new Error(data))
        resolve({
          following: data
        })
      }).catch(error => reject(error))
    }),
    get: () => new Promise((resolve, reject) => {
      const url = `https://api.github.com/users/${username}`
      http.get(url).then(({
        status,
        headers,
        data
      }) => {
        if (status !== 200) reject(new Error(data))
        const user = data
        user.created_at = util.toReadableTime(user.created_at)
        resolve(user)
      }).catch(error => reject(error))
    })
  }
}

module.exports = users