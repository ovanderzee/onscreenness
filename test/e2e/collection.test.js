const server = require('../../lib/static-server')
const triggerEvent = require('./_interaction').triggerEvent
        
describe(
  'Basic collection methods',
  () => {
    beforeAll(async () => {
      await server.start()
      await page.goto(`http://localhost:${server.port}/test/basic.html`)
      await page.waitForSelector('footer')
    })

    afterEach(async () => {
      await page.click('button#reset')
    })

    afterAll(() => {
      server.stop()
    })



    let scrapScenario = async (page, collectBtnQry, scrapBtnQry, callback) => {
      await page.click(collectBtnQry)
      await triggerEvent(page)
//      await page.screenshot({path: `${process.cwd()}/test/screenshots/${collectBtnQry}-${scrapBtnQry}_collect.png`})

      let involvedElements = '*[data-onscreenness]'
      let involvedElementsCount = await page.$$eval(involvedElements, elms => elms.length);

      await page.click(scrapBtnQry)
//      await page.screenshot({path: `${process.cwd()}/test/screenshots/${collectBtnQry}-${scrapBtnQry}_scrap.png`})

      let newElementsCount = await page.$$eval(involvedElements, elms => elms.length);
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
