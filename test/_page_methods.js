
// https://jestjs.io/docs/en/puppeteer
// https://github.com/facebook/jest/issues/7962

//find and replace
//  page.$eval( --> pageMethods(page).$eval(
//  page.$$eval( --> pageMethods(page).$$eval(
//  page.evaluate( --> pageMethods(page).evaluate(

let pageMethods = function (page) {
  return {
    $eval: async (selectOne, action) => {
      return await page.$eval(selectOne, action)
    },
    $$eval: async (selectAll, action) => {
      return await page.$$eval(selectAll, action)
    },
    evaluate: async (action) => {
      return await page.evaluate(action)
    }
  }
}

module.exports = pageMethods
