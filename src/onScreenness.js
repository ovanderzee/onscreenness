import {
	commaSeperatedListToArray,
	queryToArray,
	roundAt
} from './utilities.js'
import { collectionManagement } from './collectionManagement.js'
import { coreFunctions } from './coreFunctions.js'
import documentStaging from '../node_modules/document-staging/dist/index.esm.js'

let onScreennessModule = (function () {

	/** 
	 * Loops all elements from the jobList
	 * @private
	 */
	var changeHandler = function () {
		collectionManagement.buildElementList().forEach ( function ( element ) {
			var boundingRect = element.getBoundingClientRect()
			var props = coreFunctions.calculatePresence ( boundingRect )
			coreFunctions.attachIdentifiers ( element, props )
		})
	}

	window.addEventListener('resize', changeHandler, false)
	window.addEventListener('scroll', changeHandler, true)
	let DOMObserver = new MutationObserver( function ( mutationsList, observer ) {
		if ( mutationsList.length ) {
			changeHandler()
		}
	})
	documentStaging.onInteractive([
		changeHandler,
		function () {
			DOMObserver.observe( document.body, { childList: true, subtree: true } )
		},
	])

	return {
		publicAPI: {
			collect: function ( rawQuery ) {
				collectionManagement.collect ( rawQuery )
				documentStaging.onInteractive ([ changeHandler ])
			},
			exclude: function ( rawQuery ) {
				documentStaging.onInteractive ([ 
					function () { coreFunctions.detachIdentifiers ( collectionManagement.exclude ( rawQuery ) ) },
					changeHandler,
				])
			},
			remove: function ( rawQuery ) {
				documentStaging.onInteractive ([ 
					function () { coreFunctions.detachIdentifiers ( collectionManagement.remove ( rawQuery ) ) },
					changeHandler,
				])
			},
			reset: function () {
				documentStaging.onInteractive ([
					function () { coreFunctions.detachIdentifiers ( collectionManagement.reset () ) },
				])
			},
		},
		testSuite: {
			getVariables: collectionManagement.getVariables,
			trigger: changeHandler,
			liveList: collectionManagement.buildElementList,
			calculate: coreFunctions.calculatePresence,
			treat: coreFunctions.attachIdentifiers,
		}
	}
})()

let onScreenness = onScreennessModule.publicAPI
let onScreenTest = onScreennessModule.testSuite

export { onScreenness, onScreenTest }
