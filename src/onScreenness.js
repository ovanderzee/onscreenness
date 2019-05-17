
import {
	roundAt
} from './utilities';

const onScreenness = new function () {
	var queryList = [];
	var blackList = [];

	/**
	 * Remove dataset and classNames from queried elements
	 * @private
	 * @param {string} removeList - querySelector
	 */
	var detachIdentifiers = function ( removeList ) {
		var elementList = removeList.length 
							? document.querySelectorAll ( removeList.join(',') ) 
							: [];

		elementList.forEach( function ( element ) {
			if ( !element ) {
				return;
			}
			element.classList.remove('onscreen');
			element.classList.remove('offscreen');
			delete element.dataset['onscreenness'];
		});
	};

	/**
	 * Preprocess query string to normalised array
	 * @private
	 * @param {string} rawQuery - (multiple) querySelector
	 */
	var trimmedQueries = function ( rawQuery ) {
		var queries = rawQuery.split(',');
		return queries.filter ( ( query ) => {
			return query.trim();
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
			if ( currentList.indexOf ( newQuery ) == -1 ) {
				currentList.push ( newQuery );
			}
		});
	};

	/**
	 * Add query to queryList
	 * @param {string} rawQuery - querySelector
	 */
	this.collect = function ( rawQuery ) {
		var queries = trimmedQueries ( rawQuery );
		addQueries ( queryList, queries );
	};

	/**
	 * Add to blacklist
	 * @param {string} rawQuery - querySelector
	 */
	this.exclude = function ( rawQuery ) {
		var queries = trimmedQueries ( rawQuery );
		detachIdentifiers ( queries );
		addQueries ( blackList, queries );
	};

	/**
	 * Remove query from queryList
	 * @param {string} rawQuery - querySelector
	 */
	this.remove = function ( rawQuery ) {
		var queries = trimmedQueries ( rawQuery );
		queries.forEach ( ( query ) => {
			if ( queryList.indexOf ( query ) > -1 ) {
				detachIdentifiers ( [query] );
				queryList.splice( queryList.indexOf ( query ), 1 );
			}
		});
	};

	/**
	 * Empty the querylist
	 */
	this.reset = function () {
		detachIdentifiers ( queryList );
		queryList = [];
	};

	/**
	 * Calculate onscreenness figures of an element
	 * @private
	 * @param {object} boundingRect
	 * @returns {object} onscreenness figures
	 */
	var calculatePresence = function ( boundingRect ) {
		var pixelDistance = {
			left : 0 - boundingRect.left,
			right: boundingRect.right - document.documentElement.clientWidth,
			top: 0 - boundingRect.top,
			bottom: boundingRect.bottom - document.documentElement.clientHeight
		};
		var pixelsAbsent = {
			left: Math.min( Math.max( pixelDistance.left, 0 ), boundingRect.width ),
			right: Math.min( Math.max( pixelDistance.right, 0 ), boundingRect.width ),
			top: Math.min( Math.max( pixelDistance.top, 0 ), boundingRect.height ),
			bottom: Math.min( Math.max( pixelDistance.bottom, 0 ), boundingRect.height ),
		};
		var relativeAbsent = {
			left: pixelsAbsent.left / boundingRect.width,
			right: pixelsAbsent.right / boundingRect.width,
			top: pixelsAbsent.top / boundingRect.height,
			bottom: pixelsAbsent.bottom / boundingRect.height
		};
		var horizontal = 1 - relativeAbsent.left - relativeAbsent.right;
		var vertical = 1 - relativeAbsent.top - relativeAbsent.bottom;

		return {
			horizontal: horizontal,
			vertical: vertical,
			surface: horizontal * vertical
		};
	};

	/** 
	 * Updates dataset and classNames of an element
	 * @private
	 * @param {element} element
	 * @param {object} presence
	 */
	var attachIdentifiers = function ( element, presence ) {
		element.dataset['onscreenness'] = String ( presence );

		var taggedOn = element.className.split(' ').indexOf ('onscreen') > -1;
		if ( presence === 1 && !taggedOn ) {
			element.className += ' onscreen';
		}
		if ( presence < 1 && taggedOn ) {
			element.className = element.className.replace(' onscreen', '');
		}

		var taggedOff = element.className.split(' ').indexOf ('offscreen') > -1;
		if ( presence === 0 && !taggedOff ) {
			element.className += ' offscreen';
		}
		if ( presence > 0 && taggedOff ) {
			element.className = element.className.replace(' offscreen', '');
		}
	};

	/** 
	 * Loops all elements from query collection
	 * @private
	 */
	var changeHandler = function () {
		var elementList = queryList.length 
							? document.querySelectorAll ( queryList.join(',') ) 
							: [];
		var ignoreList = blackList.length 
							? document.querySelectorAll ( blackList.join(',') ) 
							: [];

		elementList.forEach ( function ( element ) {
			if ( !element ) {
				return;
			}
			var ignoreMe = false;
			ignoreList.forEach ( function ( ignore ) {
				if ( ignore === element ) {
					ignoreMe = true;
				}
			});
			if ( ignoreMe ) {
				return;
			}
			var boundingRect = element.getBoundingClientRect();
			var presence = roundAt ( calculatePresence ( boundingRect ).surface, 3 );
			attachIdentifiers ( element, presence );
		});
	};

	document.addEventListener('readystatechange', function () {
		if ( document.readyState === 'interactive' ) {
			changeHandler();
		}
	}, false);
	window.addEventListener('resize', changeHandler, false);
	window.addEventListener('scroll', changeHandler, true);
};

export default onScreenness;
