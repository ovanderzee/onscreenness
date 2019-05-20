
/**
 * Round at decimals
 * @private
 * @param {number} number - any number to round
 * @param {number} decimals - number of decimals to round at
 */
const roundAt = function (number, decimals) {
	return Number ( Math.round ( number + 'e' + decimals ) + 'e-' + decimals );
};

/**
 * Process comma seperated list to a sanitised array with normalised strings
 * @private
 * @param {string} commaSeperatedList
 * @returns {array} array with strings
 */
const commaSeperatedListToArray = function ( commaSeperatedList ) {
	let list = commaSeperatedList.split(',');
	let trimmed = list.map ( item => item.trim() );
	return trimmed.filter ( item => {
		return item.length;
	});
};

export {
	commaSeperatedListToArray,
	roundAt
};
