
const triggerEvent = require('./_interaction').triggerEvent

describe(
  'Basic collection methods',
  () => {
    beforeAll(async () => {
      await page.goto(`http://localhost:8888/demo/basic.html`)
      await page.waitForSelector('footer')
    })

    afterEach(async () => {
      await page.click('button#reset')
    })



    let scrapScenario = async (page, collectBtnQry, scrapBtnQry, callback) => {
      await page.click(collectBtnQry)
      await triggerEvent(page)
//      await page.screenshot({path: `${process.cwd()}/test/temp/${collectBtnQry}-${scrapBtnQry}_collect.png`})

      let involvedElements = '*[data-onscreenness]'
      let involvedElementsCount = await page.$$eval(involvedElements, elms => elms.length);

      await page.click(scrapBtnQry)
//      await page.screenshot({path: `${process.cwd()}/test/temp/${collectBtnQry}-${scrapBtnQry}_scrap.png`})

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
