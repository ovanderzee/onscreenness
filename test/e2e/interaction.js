
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

let scrollSecondInView = async (page) => {
  await page.$eval('.example:nth-child(2n)', elm => elm.scrollIntoView())
  triggerEvent(page)
}

export {
  triggerEvent,
  scrollDown,
  scrollSecondInView,
};
