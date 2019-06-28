import {
	commaSeperatedListToArray,
	queryToArray,
} from './utilities.js';

let collectionManagement = function () {
	var baseQuery = '[data-onscreenness]';
	var queryList = [];
	var blackList = [];

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
	 * Remove query from queryList and blacklist
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
	 * Live list of elements to work on
	 * @private
	 */
	var composeJobList = function () {
		var fullList = [baseQuery].concat(queryList);
		var elementList = queryToArray ( fullList.join(',') );
		var ignoreList = blackList.length 
			? queryToArray ( blackList.join(',') )
			: [];

		return elementList.filter ( elm => !ignoreList.includes ( elm ) );
	};

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
			makeNodeList: composeJobList,
		}
	}
};

export collectionManagement;
