
import {
	commaSeperatedListToArray,
	queryToArray,
	roundAt
} from './utilities';

let onScreennessModule = (function () {
	var queryList = [];
	var blackList = [];

	/**
	 * Remove dataset and classNames from queried elements
	 * @private
	 * @param {string} removeList - querySelector
	 */
	var detachIdentifiers = function ( removeList ) {
		var elementList = removeList.length 
			? queryToArray ( removeList.join(',') )
			: [];

		elementList.forEach( function ( element ) {
			if ( !element ) {
				// the elements could be deleted
				return;
			}
			element.classList.remove('onscreen');
			element.classList.remove('offscreen');
			delete element.dataset['onscreenness'];
		});
	};

	/**
	 * Add solitary queries to a list, avoiding duplication
	 * @private
	 * @param {string} currentList - list with unique solitary queries
	 * @param {string} newQueries - querySelector
	 */
	var addQueries = function ( currentList, newQueries ) {
		newQueries.forEach ( ( newQuery ) => {
			if ( !currentList.includes ( newQuery ) ) {
				currentList.push ( newQuery );
			}
		});
	};

	/**
	 * Add query to queryList
	 * @param {string} rawQuery - querySelector
	 */
	var collect = function ( rawQuery ) {
		var queries = commaSeperatedListToArray ( rawQuery );
		addQueries ( queryList, queries );
	};

	/**
	 * Add to blacklist
	 * @param {string} rawQuery - querySelector
	 */
	var exclude = function ( rawQuery ) {
		var queries = commaSeperatedListToArray ( rawQuery );
		detachIdentifiers ( queries );
		addQueries ( blackList, queries );
	};

	/**
	 * Remove query from queryList
	 * @param {string} rawQuery - querySelector
	 */
	var remove = function ( rawQuery ) {
		var queries = commaSeperatedListToArray ( rawQuery );
		queries.forEach ( ( query ) => {
			if ( queryList.includes ( query ) ) {
				detachIdentifiers ( [query] );
				queryList.splice ( queryList.indexOf ( query ), 1 );
			}
		});
	};

	/**
	 * Empty the querylist
	 */
	var reset = function () {
		detachIdentifiers ( queryList );
		queryList = [];
		blackList = [];
	};

	/**
	 * Calculate onscreenness figures of an element
	 * @private
	 * @param {object} boundingRect
	 * @returns {object} onscreenness figures
	 */
	var calculatePresence = function ( boundingRect ) {
		var overhang = {
			left: 0 - boundingRect.left,
			right: boundingRect.right - document.documentElement.clientWidth,
			top: 0 - boundingRect.top,
			bottom: boundingRect.bottom - document.documentElement.clientHeight,
		};
		var absence = {
			left: Math.min( Math.max( overhang.left, 0 ), boundingRect.width ),
			right: Math.min( Math.max( overhang.right, 0 ), boundingRect.width ),
			top: Math.min( Math.max( overhang.top, 0 ), boundingRect.height ),
			bottom: Math.min( Math.max( overhang.bottom, 0 ), boundingRect.height ),
		};
		var relativeAbsence = {
			left: absence.left / boundingRect.width,
			right: absence.right / boundingRect.width,
			top: absence.top / boundingRect.height,
			bottom: absence.bottom / boundingRect.height,
		};

		var horizonPresence = 1 - relativeAbsence.left - relativeAbsence.right;
		var verticaPresence = 1 - relativeAbsence.top - relativeAbsence.bottom;

		var horizonOverlap = (
			boundingRect.width - absence.left - absence.right
			) / document.documentElement.clientWidth;
		var verticaOverlap = (
			boundingRect.height - absence.top - absence.bottom
			) / document.documentElement.clientHeight;

		return {
			horizonOverlap: horizonOverlap,
			verticaOverlap: verticaOverlap,
			surfaceOverlap: horizonOverlap * verticaOverlap,
			horizonPresence: horizonPresence,
			verticaPresence: verticaPresence,
			surfacePresence: horizonPresence * verticaPresence,
		};
	};

	/** 
	 * Updates dataset and classNames of an element
	 * @private
	 * @param {element} element
	 * @param {object} presentness
	 */
	var attachIdentifiers = function ( element, presentness ) {
		var presence = roundAt ( presentness.surfacePresence, 3 );
		element.dataset['onscreenness'] = String ( presence );

		var taggedOn = element.classList.contains('onscreen');
		if ( presence === 1 && !taggedOn ) {
			element.classList.add('onscreen');
		}
		if ( presence < 1 && taggedOn ) {
			element.classList.remove('onscreen');
		}

		var taggedCross = element.classList.contains('crossscreen');
		if ( presence > 0 && presence < 1 && !taggedCross ) {
			element.classList.add('crossscreen');
		}
		if ( ( presence === 0 || presence === 1 ) && taggedCross ) {
			element.classList.remove('crossscreen');
		}

		var taggedOff = element.classList.contains('offscreen');
		if ( presence === 0 && !taggedOff ) {
			element.classList.add('offscreen');
		}
		if ( presence > 0 && taggedOff ) {
			element.classList.remove('offscreen');
		}

		var horizonOverlap = roundAt ( presentness.horizonOverlap, 3 );
		var verticaOverlap = roundAt ( presentness.verticaOverlap, 3 );
		var overhanging = Math.max( horizonOverlap, verticaOverlap );
		var overlapping = roundAt ( presentness.surfaceOverlap, 3 );
		element.dataset['overlapping'] = String ( overlapping );

		var taggedOver = element.classList.contains('overscreen');
		if ( overhanging === 1 && !taggedOver ) {
			element.classList.add('overscreen');
		}
		if ( overhanging < 1 && taggedOver ) {
			element.classList.remove('overscreen');
		}
	};

	/** 
	 * Live list of elements to work on
	 * @private
	 */
	var composeJobList = function () {
		var elementList = queryList.length 
			? queryToArray ( queryList.join(',') )
			: [];
		var ignoreList = blackList.length 
			? queryToArray ( blackList.join(',') )
			: [];

		if ( elementList.length ) {
			return elementList.filter ( elm => !ignoreList.includes ( elm ) );
		} else {
			return [];
		}
	};

	/** 
	 * Loops all elements from the jobList
	 * @private
	 */
	var changeHandler = function () {
		composeJobList().forEach ( function ( element ) {
			var boundingRect = element.getBoundingClientRect();
			var presentness = calculatePresence ( boundingRect );
			attachIdentifiers ( element, presentness );
		});
	};

	document.addEventListener('readystatechange', function () {
		if ( document.readyState === 'interactive' ) {
			changeHandler();
		}
	}, false);
	window.addEventListener('resize', changeHandler, false);
	window.addEventListener('scroll', changeHandler, true);
	let DOMObserver = new MutationObserver( function ( mutationsList, observer ) {
		if ( mutationsList.length ) {
			changeHandler();
		}
	});
	window.addEventListener('load', function () {
		DOMObserver.observe( document.body, { childList: true, subtree: true } );
	}, true);

	return {
		publicAPI: {
			collect: collect,
			exclude: exclude,
			remove: remove,
			reset: reset
		},
		testSuite: {
			/**
			 * Current variables, for testing purposes
			 * @private
			 * @returns {object} current variables
			 */
			getVariables: function () {
				return {
					queryList: queryList,
					blackList: blackList
				};
			},
			triggerEvent: changeHandler,
			makeNodeList: composeJobList,
			calculatePresence: calculatePresence,
			treatElement: attachIdentifiers,
			cleanElements: detachIdentifiers
		}
	}
})();

let onScreenness = onScreennessModule.publicAPI;
let onScreenTest = onScreennessModule.testSuite;

export { onScreenness, onScreenTest };
