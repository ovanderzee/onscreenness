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
		let elementList = removeList.length 
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
		let overhang = {
			left: 0 - boundingRect.left,
			right: boundingRect.right - document.documentElement.clientWidth,
			top: 0 - boundingRect.top,
			bottom: boundingRect.bottom - document.documentElement.clientHeight,
		}
		let absence = {
			left: Math.min( Math.max( overhang.left, 0 ), boundingRect.width ),
			right: Math.min( Math.max( overhang.right, 0 ), boundingRect.width ),
			top: Math.min( Math.max( overhang.top, 0 ), boundingRect.height ),
			bottom: Math.min( Math.max( overhang.bottom, 0 ), boundingRect.height ),
		}
		let relativeAbsence = {
			left: absence.left / boundingRect.width,
			right: absence.right / boundingRect.width,
			top: absence.top / boundingRect.height,
			bottom: absence.bottom / boundingRect.height,
		}

		let horizontalPresence = 1 - relativeAbsence.left - relativeAbsence.right
		let verticalPresence = 1 - relativeAbsence.top - relativeAbsence.bottom

		let horizontalOverlap = (
			boundingRect.width - absence.left - absence.right
			) / document.documentElement.clientWidth
		let verticalOverlap = (
			boundingRect.height - absence.top - absence.bottom
			) / document.documentElement.clientHeight

		let widthRatio = boundingRect.width / document.documentElement.clientWidth
		let heightRatio = boundingRect.height / document.documentElement.clientHeight

		return {
			overhang: overhang,
			widthRatio: widthRatio,
			heightRatio: heightRatio,
			areaRatio: widthRatio * heightRatio,
			horizontalOverlap: horizontalOverlap,
			verticalOverlap: verticalOverlap,
			surfaceOverlap: horizontalOverlap * verticalOverlap,
			horizontalPresence: horizontalPresence,
			verticalPresence: verticalPresence,
			surfacePresence: horizontalPresence * verticalPresence,
		}
	},

	/** 
	 * Updates dataset and classNames of an element
	 * @private
	 * @param {element} element
	 * @param {object} props - presence properties
	 */
	attachIdentifiers: function ( element, props ) {
		let mutations = {}
		let noteAndUpdate = record => {
			if ( record.addClass ) {
				mutations.addClass = mutations.addClass ? `${mutations.addClass} ${record.addClass}` : record.addClass
				element.classList.add(record.addClass)
			} else {
				mutations.removeClass = mutations.removeClass ? `${mutations.removeClass} ${record.removeClass}` : record.removeClass
				element.classList.remove(record.removeClass)
			}
		}

//		console.log('presence properties ' + JSON.stringify(props))
		let presence = roundAt ( props.surfacePresence, 3 )
		element.dataset['onscreenness'] = String ( presence )

		let taggedOn = element.classList.contains('onscreen')
		if ( presence === 1 && !taggedOn ) {
			noteAndUpdate({addClass: 'onscreen'})
		}
		if ( presence < 1 && taggedOn ) {
			noteAndUpdate({removeClass: 'onscreen'})
		}

		let taggedCross = element.classList.contains('crossscreen')
		if ( presence > 0 && presence < 1 && !taggedCross ) {
			noteAndUpdate({addClass: 'crossscreen'})
		}
		if ( ( presence === 0 || presence === 1 ) && taggedCross ) {
			noteAndUpdate({removeClass: 'crossscreen'})
		}

		let taggedOff = element.classList.contains('offscreen')
		if ( presence === 0 && !taggedOff ) {
			noteAndUpdate({addClass: 'offscreen'})
		}
		if ( presence > 0 && taggedOff ) {
			noteAndUpdate({removeClass: 'offscreen'})
		}

		let overlapping = roundAt ( props.surfaceOverlap, 3 )
		element.dataset['overlapping'] = String ( overlapping )

		let horizontalOverhang = props.widthRatio > 1 && props.horizontalOverlap === 1 && props.verticalPresence === 1
		let verticalOverhang = props.heightRatio > 1 && props.verticalOverlap === 1 && props.horizontalPresence === 1
		let overscreen = props.surfaceOverlap === 1 || horizontalOverhang || verticalOverhang
		let taggedOver = element.classList.contains('overscreen')
		if ( overscreen && !taggedOver ) {
			noteAndUpdate({addClass: 'overscreen'})
		}
		if ( !overscreen && taggedOver ) {
			noteAndUpdate({removeClass: 'overscreen'})
		}

		return mutations
	},

}

export { coreFunctions }
