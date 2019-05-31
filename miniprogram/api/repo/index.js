const http = require('../http.js')
const utils = require('../../utils/util.js')
const {token} = require('../../config/secret.js')
const repos = repo => ({

  readme: () => {
    const url = `https://api.github.com/repos/${repo}/readme`
    return new Promise((resolve, reject) => {
      http.get(url).then(({ status, data }) => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getRepo: () => {
    const url = `https://api.github.com/repos/${repo}`
    console.log(url)
    return new Promise((resolve, reject) => {
      http.get(url).then(({
        status,
        data,
        headers
      }) => {
        const repo = data
        repo.created_at = utils.toReadableTime(repo.created_at)
        repo.updated_at = utils.toReadableTime(repo.updated_at)
        repo.pushed_at = utils.toReadableTime(repo.pushed_at)
        console.log(repo)
        resolve({
          repo
        })
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }
})

module.exports = repos