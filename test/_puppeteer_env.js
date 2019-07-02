
const puppeteer = require('puppeteer')
const NodeEnvironment = require('jest-environment-node')

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)
  }

  async setup() {
    await super.setup()

    const browser = await puppeteer.connect({
      browserWSEndpoint: global.__BROWSER__.wsEndpoint(),
    })
    this.global.page = await browser.newPage()
    this.global.origin = `http://${global.__HTTPSERVER__.host}:${global.__HTTPSERVER__.port}`
  }
}

module.exports = PuppeteerEnvironment
