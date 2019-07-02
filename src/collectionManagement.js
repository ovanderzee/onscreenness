import {
	arrayIntersection,
	commaSeperatedListToArray,
	queryToArray,
} from './utilities.js'

let collectionManagement = (function () {
	const baseQuery = '[data-onscreenness]'
	let queryList = {}
	let blackList = []

	/**
	 * Add solitary queries to a list, avoiding duplication
	 * @private
	 * @param {string} currentList - list with unique solitary queries
	 * @param {string} newQueries - querySelector
	 */
	const addQueries = function ( currentList, newQueries ) {
		newQueries.forEach ( ( newQuery ) => {
			if ( !currentList.includes ( newQuery ) ) {
				currentList.push ( newQuery )
			}
		})
	}

	/**
	 * Add query to queryList
	 * @param {string} rawQuery - querySelector
	 * @param {function} callback - function accepts element as this
	 * @returns {array} normalised input
	 */
	const collect = function ( rawQuery, callback = null ) {
		let queries = commaSeperatedListToArray ( rawQuery )
		queries.forEach ( ( query ) => {
			if ( typeof callback === 'function' ) {
				queryList[ query ] = callback
			} else {
				queryList[ query ] = null
			}
		})
		return queries
	}

	/**
	 * Add to blacklist
	 * @param {string} rawQuery - querySelector
	 * @returns {array} normalised input
	 */
	const exclude = function ( rawQuery ) {
		let queries = commaSeperatedListToArray ( rawQuery )
		addQueries ( blackList, queries )
		return queries
	}

	/**
	 * Remove query from queryList and blacklist
	 * @param {string} rawQuery - querySelector
	 * @returns {array} normalised input
	 */
	const remove = function ( rawQuery ) {
		let queries = commaSeperatedListToArray ( rawQuery )
		let queryKeys = Object.keys( queryList )
		let queryIntersection = arrayIntersection ( queryKeys, queries )
		queryIntersection.forEach ( ( query ) => {
			delete queryList[ query ]
		})
		return queryIntersection
	}

	/**
	 * Empty the querylist
	 * @returns {array} query for all treated items
	 */
	const reset = function () {
		queryList = {}
		blackList = []
		return [baseQuery]
	}


	/**
	 * Current variables, for testing purposes
	 * @private
	 * @returns {object} current variables
	 */
	const getVariables = () => {
		return {
			queryList: Object.assign({}, queryList),
			queryKeys: Object.keys( queryList ),
			blackList: blackList.concat(),
		}
	}

	/** 
	 * Live list of elements to work on
	 * @private
	 */
	const buildElementList = function () {
		let fullList = [baseQuery].concat( Object.keys( queryList ) )
		let elementList = queryToArray ( fullList.join(',') )
		let ignoreList = blackList.length 
			? queryToArray ( blackList.join(',') )
			: []

		return elementList.filter ( elm => !ignoreList.includes ( elm ) )
	}

	return {
		collect: collect,
		exclude: exclude,
		remove: remove,
		reset: reset,
		getVariables: getVariables,
		buildElementList: buildElementList,
	}
})()

export { collectionManagement };
