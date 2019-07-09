const pageMethods = require('../_page_methods.js')
const interaction = require('../_spec_helper.js')
const triggerEvent = interaction.triggerEvent
const outputCoverageScores = interaction.outputCoverageScores
const pti = require('puppeteer-to-istanbul')

describe(
  'Basic collection methods',
  () => {
    beforeAll(async () => {
      await Promise.all([
        page.coverage.startJSCoverage(),
      ])
      await page.goto(`${origin}/test/basic.html`)
      await page.waitForSelector('footer')
    })

    afterEach(async () => {
      await page.click('button#reset')
    })

    afterAll(async () => {
      const [jsCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
      ])
//      await outputCoverageScores(jsCoverage)
      pti.write(jsCoverage)
    })



    let scrapScenario = async (page, collectBtnQry, scrapBtnQry, callback) => {
      await page.click(collectBtnQry)
      await triggerEvent(page)
//      await page.screenshot({path: `${process.cwd()}/test/screenshots/${collectBtnQry}-${scrapBtnQry}_collect.png`})

      let involvedElements = '*[data-onscreenness]'
      let involvedElementsCount = await pageMethods(page).$$eval(involvedElements, elms => elms.length);

      await page.click(scrapBtnQry)
//      await page.screenshot({path: `${process.cwd()}/test/screenshots/${collectBtnQry}-${scrapBtnQry}_scrap.png`})

      let newElementsCount = await pageMethods(page).$$eval(involvedElements, elms => elms.length);
      await expect( involvedElementsCount ).toBeGreaterThan( newElementsCount );
      
      if (callback) {
        callback( newElementsCount );
      }
    }

    it('when excluding, classes and data-attributes are immediately scrapped', async () => {
      await scrapScenario (page, 'button#collect-example', 'button#exclude-example')
    })

    it('when removing, classes and data-attributes are immediately scrapped', async () => {
      await scrapScenario (page, 'button#collect-section', 'button#remove-section')
    })

    it('when ressetting, classes and data-attributes are immediately scrapped', async () => {
      await scrapScenario (page, 'button#collect-section', 'button#reset', async ( newElementsCount ) => {
        await expect( newElementsCount ).toBe( 0 );
      })
    })



  }
)
