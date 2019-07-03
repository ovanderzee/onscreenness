import {
	arrayIntersection,
	commaSeperatedListToArray,
	queryToArray,
} from './utilities.js'

let collectionManagement = (function () {
	const baseQuery = '[data-onscreenness]'
	let queryList = []
	let blackList = []
	let callbackObj = {}

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
	 * @param {function} callback (optional)
	 * @returns {array} normalised input
	 */
	const collect = function ( rawQuery, callback ) {
		let queries = commaSeperatedListToArray ( rawQuery )
		addQueries ( queryList, queries )
		if ( callback && typeof callback === 'function' ) {
			queries.forEach ( query => callbackObj[query] = callback )
		}
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
		let queryIntersection = arrayIntersection ( queryList, queries )
		queryIntersection.forEach ( ( query ) => {
			queryList.splice ( queryList.indexOf ( query ), 1 )
		})
		return queryIntersection
	}

	/**
	 * Empty the querylist
	 * @returns {array} query for all treated items
	 */
	const reset = function () {
		queryList = []
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
			queryList: queryList.concat(),
			blackList: blackList.concat(),
			callbackObj: Object.assign({}, callbackObj),
		}
	}

	/** 
	 * Live list of elements to work on
	 * @private
	 */
	const buildNodeList = function () {
		let fullList = [baseQuery].concat(queryList)
		let elementList = queryToArray ( fullList.join(',') )
		let ignoreList = blackList.length 
			? queryToArray ( blackList.join(',') )
			: []

		return elementList.filter ( elm => !ignoreList.includes ( elm ) )
	}

	/** 
	 * Live map of elements to execute function with
	 * @private
	 */
	const buildCallbackMap = function () {
		let callbackMap = new Map();
		Object.entries(callbackObj).forEach ( ([ query, callback ]) => {
			queryToArray ( query ).forEach ( elm => {
				callbackMap.set ( elm, callback )
			})
		})

		return callbackMap
	}

	return {
		collect: collect,
		exclude: exclude,
		remove: remove,
		reset: reset,
		getVariables: getVariables,
		buildNodeList: buildNodeList,
		buildCallbackMap: buildCallbackMap,
	}
})()

export { collectionManagement };
