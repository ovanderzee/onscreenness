
/**
 * Round at decimals
 * @private
 * @param {number} number - any number to round
 * @param {number} decimals - number of decimals to round at
 */
const roundAt = function (number, decimals) {
	return Number ( Math.round ( number + 'e' + decimals ) + 'e-' + decimals );
};

export {
	roundAt
};
