
/**
 * Round at decimals
 * @private
 * @param {number} number - any number to round
 * @param {number} decimals - number of decimals to round at
 */
const roundAt = function (number, decimals) {
	// https://www.jacklmoore.com/notes/rounding-in-javascript/
	return Number ( Math.round ( number + 'e' + decimals ) + 'e-' + decimals )
}

/**
 * Process comma seperated list to a sanitised array with normalised strings
 * @private
 * @param {string} commaSeperatedList
 * @returns {array} array with strings
 */
const commaSeperatedListToArray = function ( commaSeperatedList ) {
	let list = commaSeperatedList.split(',')
	let trimmed = list.map ( item => item.trim().replace(/\s+/g, ' ') )
	return trimmed.filter ( item => {
		return item.length
	})
}

/**
 * Convert a static nodeList to an array to be able to perform array operations like filter or map
 * @private
 * @param {nodeList} nodeList
 * @returns {array} array with HTMLElements
 */
const queryToArray = function ( query ) {
	// the push.apply operation is in most browsers among the fastest
	// https://jsperf.com/nodelist-to-array/27
	var elementArray = []
	elementArray.push.apply(elementArray, document.querySelectorAll ( query ) )
	return elementArray
}

/**
 * Find the intersection betweeen two arrays
 * @param {array} array1
 * @param {array} array2
 * @return {array}
 */
const arrayIntersection = function(array1, array2) {
    let lookup = {}
    let results = []
    array1.map(member => lookup[member] = 1)
    array2.map(member => {
        if (lookup[member] === 1) {
            results.push(member)
            delete lookup[member]
        }
    })
    return results
}

export {
	arrayIntersection,
	commaSeperatedListToArray,
	queryToArray,
	roundAt
}
