const chalk = require('chalk')

let triggerEvent = async (page) => {
  await page.evaluate(_ => {
	let resizeEvent = new FocusEvent('resize', {})
	window.dispatchEvent(resizeEvent)
  })
}

exports.triggerEvent = triggerEvent

exports.scrollDown = async (page) => {
  await page.evaluate(_ => {
	window.scrollTo(0, document.body.scrollHeight)
  })
  triggerEvent(page)
}

exports.scrollSecondInView = async (page) => {
  await page.$eval('.example:nth-child(2n)', elm => elm.scrollIntoView())
  triggerEvent(page)
}

exports.outputCoverageScores = (jsCoverage) => {
  let coverageScore = []
  for (const entry of jsCoverage) {
	let entryBytes = 0
	for (const range of entry.ranges) {
	  entryBytes += range.end - range.start - 1
	}
	coverageScore.push(`Spec coverage for ${entry.url.split('/').pop()}: ${Math.round(entryBytes / entry.text.length * 10000)/100}%`)
  }
  console.log(chalk.blue.bold(coverageScore.join('\n')))
}
