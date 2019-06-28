
global.__HTTPSERVER__ = require('../lib/static-server')
const puppeteer = require('puppeteer')

module.exports = async function () {
  global.__HTTPSERVER__.start(function () {
    console.log('test server started')
  })

  // to check
  //global.__BROWSER__ = await puppeteer.launch({ headless: false, slowMo: 500, waitUntil: 'networkidle' })
  // in production
  global.__BROWSER__ = await puppeteer.launch({ headless: true })
}
