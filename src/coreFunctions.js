import {
	queryToArray,
	roundAt
} from './utilities.js'

let coreFunctions = (function () {

	let propsMap = new WeakMap()

	/**
	 * Remove datasets and classNames from queried elements
	 * @private
	 * @param {string} removeList - querySelector
	 */
	const detachIdentifiers = function ( removeList ) {
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
	}

	/**
	 * Calculate onscreenness figures of an element
	 * @private
	 * @param {object} boundingRect
	 * @returns {object} onscreenness figures
	 */
	const calculatePresence = function ( boundingRect ) {
		let time = Date.now()

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

		// Presence
		let horizontalPresence = 1 - relativeAbsence.left - relativeAbsence.right
		let verticalPresence = 1 - relativeAbsence.top - relativeAbsence.bottom

		// Overlapping
		let horizontalOverlap = (
			boundingRect.width - absence.left - absence.right
			) / document.documentElement.clientWidth
		let verticalOverlap = (
			boundingRect.height - absence.top - absence.bottom
			) / document.documentElement.clientHeight

		let widthRatio = boundingRect.width / document.documentElement.clientWidth
		let heightRatio = boundingRect.height / document.documentElement.clientHeight

		return {
			time: time,
			overhang: overhang,
			widthRatio: widthRatio,
			heightRatio: heightRatio,
			areaRatio: widthRatio * heightRatio,
			horizontalDecentering: horizontalDecentering,
			verticalDecentering: verticalDecentering,
			surfaceDecentering: positiveDecentering ? absoluteDecentering : 0 - absoluteDecentering,
			horizontalOverlap: horizontalOverlap,
			verticalOverlap: verticalOverlap,
			surfaceOverlap: horizontalOverlap * verticalOverlap,
			horizontalPresence: horizontalPresence,
			verticalPresence: verticalPresence,
			surfacePresence: horizontalPresence * verticalPresence,
		}
	}

	/** 
	 * Updates dataset and classNames of an element
	 * @private
	 * @param {element} element
	 * @param {object} props - presence properties
	 */
	const attachIdentifiers = function ( element, props ) {
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

		let considerUpdate = ( className, applicableCondition ) => {
			let hasClass = element.classList.contains( className )
			if ( applicableCondition && !hasClass ) {
				noteAndUpdate({addClass: className})
			}
			if ( !applicableCondition && hasClass ) {
				noteAndUpdate({removeClass: className})
			}
		}

		// Presence
		let presence = roundAt ( props.surfacePresence, 3 )
		element.dataset['onscreenness'] = String ( presence )

		considerUpdate ( 'onscreen', presence === 1 )
		considerUpdate ( 'crossscreen', presence > 0 && presence < 1 )
		considerUpdate ( 'offscreen', presence === 0 )

		// Overlapping
		let overlapping = roundAt ( props.surfaceOverlap, 3 )
		element.dataset['overlapping'] = String ( overlapping )

		let horizontalOverhang = props.widthRatio > 1 && props.horizontalOverlap === 1 && props.verticalPresence === 1
		let verticalOverhang = props.heightRatio > 1 && props.verticalOverlap === 1 && props.horizontalPresence === 1
		let overscreen = props.surfaceOverlap === 1 || horizontalOverhang || verticalOverhang

		considerUpdate ( 'overscreen', overscreen )


		propsMap.set( element, props )
		return mutations
	}
	
	return {
		detachIdentifiers: detachIdentifiers,
		calculatePresence: calculatePresence,
		attachIdentifiers: attachIdentifiers,
	}

})()

export { coreFunctions }
