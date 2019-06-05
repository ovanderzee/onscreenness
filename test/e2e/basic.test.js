const timeout = 10000
// typingSpeed value is set for wait time between keystrokes. Simulates realistic typing.
const typingSpeed = 50

describe(
  'Basic example',
  () => {
    let page
    beforeAll(async () => {
      jest.setTimeout(timeout)
      page = await global.__BROWSER__.newPage()
      await page.goto(`file://${process.cwd()}/demo/basic.html`)
      await page.waitForSelector('footer')
    }, timeout)

    afterEach(async () => {
      await page.waitFor(1000)
    })

    afterAll(async () => {
      await page.close()
    })

    let triggerEvent = (page) => {
      page.evaluate(_ => {
        let resizeEvent = new FocusEvent('resize', {})
        window.dispatchEvent(resizeEvent)
      })
    }

    let scrollDown = (page) => {
      page.evaluate(_ => {
        window.scrollTo(0, document.body.scrollHeight)
      })
      triggerEvent(page)
    }

    let scrollSecondInView = (page) => {
      page.$eval('.example:nth-child(2n)', elm => elm.scrollIntoView())
      triggerEvent(page)
    }

    let scrapScenario = async (page, collectBtnQry, scrapBtnQry, callback) => {
      await page.click(collectBtnQry)
      await triggerEvent(page)

      let involvedElements = '*[data-onscreenness]'
      let involvedElementsCount = await page.$$eval(involvedElements, elms => elms.length);

      await page.click(scrapBtnQry)

      let newElementsCount = await page.$$eval(involvedElements, elms => elms.length);
      await expect( involvedElementsCount ).toBeGreaterThan( newElementsCount );
      
      if (callback) {
        callback( newElementsCount );
      }
    }



    it('when excluding, classes and data-attributes are immediately scrapped', async () => {
      scrapScenario (page, 'button#collect-example', 'button#exclude-example')
    })

    it('when removing, classes and data-attributes are immediately scrapped', async () => {
      scrapScenario (page, 'button#collect-section', 'button#remove-section')
    })

    it('when ressetting, classes and data-attributes are immediately scrapped', async () => {
      scrapScenario (page, 'button#collect-section', 'button#reset', ( newElementsCount ) => {
        console.log('---')
        expect( newElementsCount ).toBe( 0 );
      })
    })

    it('an element can not have more than one on/cross/off-class at the time, and classes can change when viewport changes', async () => {
      await page.click('button#collect-example')

      await triggerEvent(page)

      let first = '.example:first-child'
      let hasClassOnscreen1 = await page.$eval(first, elm => elm.classList.contains('onscreen'));
      await expect(hasClassOnscreen1).toBeTruthy()
      let hasClassCrossscreen1 = await page.$eval(first, elm => elm.classList.contains('crossscreen'));
      await expect(hasClassCrossscreen1).toBeFalsy()
      let hasClassOffscreen1 = await page.$eval(first, elm => elm.classList.contains('offscreen'));
      await expect(hasClassOffscreen1).toBeFalsy()

      let fourth = '.example:nth-child(4n)'
      let hasClassOnscreen2 = await page.$eval(fourth, elm => elm.classList.contains('onscreen'));
      await expect(hasClassOnscreen2).toBeFalsy()
      let hasClassCrossscreen2 = await page.$eval(fourth, elm => elm.classList.contains('crossscreen'));
      await expect(hasClassCrossscreen2).toBeTruthy()
      let hasClassOffscreen2 = await page.$eval(fourth, elm => elm.classList.contains('offscreen'));
      await expect(hasClassOffscreen2).toBeFalsy()

      let fifth = '.example:nth-child(5n)'
      let hasClassOnscreen3 = await page.$eval(fifth, elm => elm.classList.contains('onscreen'));
      await expect(hasClassOnscreen3).toBeFalsy()
      let hasClassCrossscreen3 = await page.$eval(fifth, elm => elm.classList.contains('crossscreen'));
      await expect(hasClassCrossscreen3).toBeFalsy()
      let hasClassOffscreen3 = await page.$eval(fifth, elm => elm.classList.contains('offscreen'));
      await expect(hasClassOffscreen3).toBeTruthy()

      let last = '.example:last-child'
      let hasClassOnscreen4 = await page.$eval(last, elm => elm.classList.contains('onscreen'));
      await expect(hasClassOnscreen4).toBeFalsy()
      let hasClassCrossscreen4 = await page.$eval(last, elm => elm.classList.contains('crossscreen'));
      await expect(hasClassCrossscreen4).toBeFalsy()
      let hasClassOffscreen4 = await page.$eval(last, elm => elm.classList.contains('offscreen'));
      await expect(hasClassOffscreen4).toBeTruthy()

      await scrollDown(page)
      
      let hasClassOnscreenA = await page.$eval(first, elm => elm.classList.contains('onscreen'));
      await expect(hasClassOnscreenA).toBeFalsy()
      let hasClassCrossscreenA = await page.$eval(first, elm => elm.classList.contains('crossscreen'));
      await expect(hasClassCrossscreenA).toBeFalsy()
      let hasClassOffscreenA = await page.$eval(first, elm => elm.classList.contains('offscreen'));
      await expect(hasClassOffscreenA).toBeTruthy()

      let hasClassOnscreenB = await page.$eval(fourth, elm => elm.classList.contains('onscreen'));
      await expect(hasClassOnscreenB).toBeFalsy()
      let hasClassCrossscreenB = await page.$eval(fourth, elm => elm.classList.contains('crossscreen'));
      await expect(hasClassCrossscreenB).toBeFalsy()
      let hasClassOffscreenB = await page.$eval(fourth, elm => elm.classList.contains('offscreen'));
      await expect(hasClassOffscreenB).toBeTruthy()

      let hasClassOnscreenC = await page.$eval(fifth, elm => elm.classList.contains('onscreen'));
      await expect(hasClassOnscreenC).toBeFalsy()
      let hasClassCrossscreenC = await page.$eval(fifth, elm => elm.classList.contains('crossscreen'));
      await expect(hasClassCrossscreenC).toBeTruthy()
      let hasClassOffscreenC = await page.$eval(fifth, elm => elm.classList.contains('offscreen'));
      await expect(hasClassOffscreenC).toBeFalsy()

      let hasClassOnscreenD = await page.$eval(last, elm => elm.classList.contains('onscreen'));
      await expect(hasClassOnscreenD).toBeTruthy()
      let hasClassCrossscreenD = await page.$eval(last, elm => elm.classList.contains('crossscreen'));
      await expect(hasClassCrossscreenD).toBeFalsy()
      let hasClassOffscreenD = await page.$eval(last, elm => elm.classList.contains('offscreen'));
      await expect(hasClassOffscreenD).toBeFalsy()
    })

    it('an element too big for the viewport can get the overscreen-class', async () => {
      await page.click('button#collect-section')

      await triggerEvent(page)
//      await page.screenshot({path: `${process.cwd()}/1.png`})

      let section = 'section'

      let hasClassOnscreen1 = await page.$eval(section, elm => elm.classList.contains('onscreen'));
      await expect(hasClassOnscreen1).toBeFalsy()
      let hasClassCrossscreen1 = await page.$eval(section, elm => elm.classList.contains('crossscreen'));
      await expect(hasClassCrossscreen1).toBeTruthy()
      let hasClassOffscreen1 = await page.$eval(section, elm => elm.classList.contains('offscreen'));
      await expect(hasClassOffscreen1).toBeFalsy()
      let hasClassOverscreen1 = await page.$eval(section, elm => elm.classList.contains('overscreen'));
      await expect(hasClassOverscreen1).toBeFalsy()

      await scrollSecondInView(page)
//      await page.screenshot({path: `${process.cwd()}/2.png`})

      let hasClassOnscreen2 = await page.$eval(section, elm => elm.classList.contains('onscreen'));
      await expect(hasClassOnscreen2).toBeFalsy()
      let hasClassCrossscreen2 = await page.$eval(section, elm => elm.classList.contains('crossscreen'));
      await expect(hasClassCrossscreen2).toBeTruthy()
      let hasClassOffscreen2 = await page.$eval(section, elm => elm.classList.contains('offscreen'));
      await expect(hasClassOffscreen2).toBeFalsy()
      let hasClassOverscreen2 = await page.$eval(section, elm => elm.classList.contains('overscreen'));
      await expect(hasClassOverscreen2).toBeTruthy()

      await scrollDown(page)
//      await page.screenshot({path: `${process.cwd()}/3.png`})

      let hasClassOnscreen3 = await page.$eval(section, elm => elm.classList.contains('onscreen'));
      await expect(hasClassOnscreen3).toBeFalsy()
      let hasClassCrossscreen3 = await page.$eval(section, elm => elm.classList.contains('crossscreen'));
      await expect(hasClassCrossscreen3).toBeTruthy()
      let hasClassOffscreen3 = await page.$eval(section, elm => elm.classList.contains('offscreen'));
      await expect(hasClassOffscreen3).toBeFalsy()
      let hasClassOverscreen3 = await page.$eval(section, elm => elm.classList.contains('overscreen'));
      await expect(hasClassOverscreen3).toBeFalsy()
    })

  },
  timeout
)




