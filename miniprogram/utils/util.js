const moment = require('./moment.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatSeconds = (s) => {
  let str = ""
  if (s > 0) {
    const minutes = Math.floor(s / 60);
    const seconds = Math.floor(s - minutes * 60);
    let m_str = minutes < 10 ? "0" + minutes : minutes;
    let s_str = seconds < 10 ? "0" + seconds : seconds;
    str = m_str + ":" + s_str + "\"";
  }
  return str;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const toReadableTime = (time) => {
  let then = moment(time)
  let now = moment()
  if (now.diff(then, 'days') <= 7) {
    return then.fromNow()
  }
  return then.format('YYYY/MM/DD')
}

const checkLogin = () => {
  if (wx.getStorageSync('openid')) {
    return true
  } else {
    return false
  }
}
module.exports = {
  formatTime: formatTime,
  toReadableTime: toReadableTime,
  formatSeconds: formatSeconds,
  checkLogin: checkLogin
}