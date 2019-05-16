
import {
	roundAt
} from './utilities';

const onScreenness = new function () {
	var queryList = [];

	/**
	 * Add to list of unique queries
	 * @param {string} query - querySelector
	 */
	this.collect = function ( query ) {
		if ( queryList.indexOf( query ) == -1 ) {
			queryList.push ( query );
		}
	};

	/**
	 * Empty the querylist
	 */
	this.reset = function () {
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
	var applyIdentifiers = function ( element, presence ) {
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
		var elementList = document.querySelectorAll ( queryList.join(', ') );

		elementList.forEach( function ( element ) {
			var boundingRect = element.getBoundingClientRect();
			var presence = roundAt ( calculatePresence ( boundingRect ).surface, 3 );
			applyIdentifiers ( element, presence );
		});
	};

	document.addEventListener('readystatechange', function () {
		if ( document.readyState === 'interactive' ) {
			changeHandler();
		}
	}, false);
	window.addEventListener('resize', changeHandler, false);
	window.addEventListener('scroll', changeHandler, false);
};

export default onScreenness;
