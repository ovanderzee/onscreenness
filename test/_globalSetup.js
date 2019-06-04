
const puppeteer = require('puppeteer')
const fs = require('fs')
const mkdirp = require('mkdirp')
const os = require('os')
const path = require('path')
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

module.exports = async function () {
  // to check
//  const browser = await puppeteer.launch({ headless: false, slowMo: 500, waitUntil: 'networkidle' })
  // in production
  const browser = await puppeteer.launch({ headless: true })
  // global not available inside tests
  global.__BROWSER__ = browser
  // expose the connection details via file system
  mkdirp.sync(DIR)
  fs.writeFileSync(
    path.join(DIR, 'wsEndpoint'),     
    browser.wsEndpoint()
  )
}
