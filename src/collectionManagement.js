import {
	arrayIntersection,
	commaSeperatedListToArray,
	queryToArray,
} from './utilities.js'

let collectionManagement = (function () {
	const baseQuery = '[data-onscreenness]'
	let queryList = []
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
	 * @returns {array} normalised input
	 */
	const collect = function ( rawQuery ) {
		let queries = commaSeperatedListToArray ( rawQuery )
		addQueries ( queryList, queries )
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
	 * @returns {object} current variables
	 */
	const getVariables = () => {
		return {
			queryList: queryList.concat(),
			blackList: blackList.concat(),
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

	return {
		collect: collect,
		exclude: exclude,
		remove: remove,
		reset: reset,
		getVariables: getVariables,
		buildNodeList: buildNodeList,
	}
})()

export default collectionManagement
