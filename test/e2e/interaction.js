
let triggerEvent = (page) => {
  page.evaluate(_ => {
	let resizeEvent = new FocusEvent('resize', {})
	window.dispatchEvent(resizeEvent)
  })
}

exports.triggerEvent = triggerEvent

exports.scrollDown = (page) => {
  page.evaluate(_ => {
	window.scrollTo(0, document.body.scrollHeight)
  })
  triggerEvent(page)
}

exports.scrollSecondInView = async (page) => {
  await page.$eval('.example:nth-child(2n)', elm => elm.scrollIntoView())
  triggerEvent(page)
}
