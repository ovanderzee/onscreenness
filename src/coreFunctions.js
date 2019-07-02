import {
	queryToArray,
	roundAt
} from './utilities.js'

let coreFunctions = {

	/**
	 * Remove datasets and classNames from queried elements
	 * @private
	 * @param {string} removeList - querySelector
	 */
	detachIdentifiers: function ( removeList ) {
		var elementList = removeList.length 
			? queryToArray ( removeList.join(',') )
			: []

		elementList.forEach( function ( element ) {
			// the elementList is not a live list
			if ( element ) {
				element.classList.remove('onscreen')
				element.classList.remove('offscreen')
				element.classList.remove('crossscreen')
				element.classList.remove('overscreen')
				delete element.dataset['onscreenness']
				delete element.dataset['overlapping']
			}
		})
	},

	/**
	 * Calculate onscreenness figures of an element
	 * @private
	 * @param {object} boundingRect
	 * @returns {object} onscreenness figures
	 */
	calculatePresence: function ( boundingRect ) {
		var overhang = {
			left: 0 - boundingRect.left,
			right: boundingRect.right - document.documentElement.clientWidth,
			top: 0 - boundingRect.top,
			bottom: boundingRect.bottom - document.documentElement.clientHeight,
		}
		var absence = {
			left: Math.min( Math.max( overhang.left, 0 ), boundingRect.width ),
			right: Math.min( Math.max( overhang.right, 0 ), boundingRect.width ),
			top: Math.min( Math.max( overhang.top, 0 ), boundingRect.height ),
			bottom: Math.min( Math.max( overhang.bottom, 0 ), boundingRect.height ),
		}
		var relativeAbsence = {
			left: absence.left / boundingRect.width,
			right: absence.right / boundingRect.width,
			top: absence.top / boundingRect.height,
			bottom: absence.bottom / boundingRect.height,
		}

		var horizonPresence = 1 - relativeAbsence.left - relativeAbsence.right
		var verticaPresence = 1 - relativeAbsence.top - relativeAbsence.bottom

		var horizonOverlap = (
			boundingRect.width - absence.left - absence.right
			) / document.documentElement.clientWidth
		var verticaOverlap = (
			boundingRect.height - absence.top - absence.bottom
			) / document.documentElement.clientHeight

		return {
			horizonOverlap: horizonOverlap,
			verticaOverlap: verticaOverlap,
			surfaceOverlap: horizonOverlap * verticaOverlap,
			horizonPresence: horizonPresence,
			verticaPresence: verticaPresence,
			surfacePresence: horizonPresence * verticaPresence,
		}
	},

	/** 
	 * Updates dataset and classNames of an element
	 * @private
	 * @param {element} element
	 * @param {object} props - presence properties
	 */
	attachIdentifiers: function ( element, props ) {
//		console.log('presence properties ' + JSON.stringify(props))
		var presence = roundAt ( props.surfacePresence, 3 )
		element.dataset['onscreenness'] = String ( presence )

		var taggedOn = element.classList.contains('onscreen')
		if ( presence === 1 && !taggedOn ) {
			element.classList.add('onscreen')
		}
		if ( presence < 1 && taggedOn ) {
			element.classList.remove('onscreen')
		}

		var taggedCross = element.classList.contains('crossscreen')
		if ( presence > 0 && presence < 1 && !taggedCross ) {
			element.classList.add('crossscreen')
		}
		if ( ( presence === 0 || presence === 1 ) && taggedCross ) {
			element.classList.remove('crossscreen')
		}

		var taggedOff = element.classList.contains('offscreen')
		if ( presence === 0 && !taggedOff ) {
			element.classList.add('offscreen')
		}
		if ( presence > 0 && taggedOff ) {
			element.classList.remove('offscreen')
		}

		var overlapping = roundAt ( props.surfaceOverlap, 3 )
		element.dataset['overlapping'] = String ( overlapping )

		var overhanging = (
			(props.verticaOverlap === 1 && props.horizonOverlap === 1) ||
			(props.verticaOverlap === 1 && props.horizonPresence === 1) ||
			(props.horizonOverlap === 1 && props.verticaPresence === 1)
		)
		var taggedOver = element.classList.contains('overscreen')
		if ( overhanging && !taggedOver ) {
			element.classList.add('overscreen')
		}
		if ( !overhanging && taggedOver ) {
			element.classList.remove('overscreen')
		}
	},

}

export { coreFunctions }
