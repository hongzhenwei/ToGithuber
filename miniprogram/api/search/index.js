const http = require('../http.js')
const util = require('../../utils/util.js')


const search = () => ({
  issues: ({
    q,
    sort = '',
    order = 'desc',
    page = 1,
    per_page = 10
  }) => new Promise((resolve, reject) => {
    const url = `https://api.github.com/search/issues?q=${q}&sort=${sort}&order=${order}&page=${page}&per_page=${per_page}`
    http.get(url).then(({
      status,
      headers,
      data
    }) => {
      if (status !== 200) {
        reject(new Error(data))
      }
      const issues = data.items.map(it => {
        it.created_at = util.toReadableTime(it.created_at)
        it.updated_at = util.toReadableTime(it.updated_at)
        return it
      })
      resolve(issues)
    }).catch(error => {
      reject(error)
    })
  }),

  repos: ({
      q,
      sort = '',
      order = 'desc',
      page = 1,
      per_page = 10
    }) =>
    new Promise((resolve, reject) => {
      q = encodeURI(q)
      const url = `https://api.github.com/search/repositories?q=${q}&sort=${sort}&order=${order}&page=${page}&per_page=${per_page}`
      http.get(url).then(({
        status,
        headers,
        data
      }) => {
        if (status !== 200) {
          reject(new Error(data))
        }
        const repos = data.items.map(it => {
          it.created_at = util.toReadableTime(it.created_at)
          it.updated_at = util.toReadableTime(it.updated_at)
          return it
        })
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })

    ,

  users: ({
    q,
    sort = '',
    order = 'desc',
    page = 1,
    per_page = 10
  }) => new Promise((resolve, reject) => {
    q = encodeURI(q)
    const url = `https://api.github.com/search/users?q=${q}&sort=${sort}&order=${order}&page=${page}&per_page=${per_page}`
    http.get(url).then(({
      status,
      headers,
      data
    }) => {
      if (status !== 200) {
        reject(new Error(data))
      }
      const repos = data.items.map(it => {
        it.created_at = util.toReadableTime(it.created_at)
        it.updated_at = util.toReadableTime(it.updated_at)
        return it
      })
      resolve(repos)
    }).catch(error => {
      reject(error)
    })
  })
})

module.exports = search
