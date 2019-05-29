"use strict";


const toDateTimeString = date => {
	let isoString = date.toISOString();
	if (isoString.endsWith('Z')) {
		isoString = isoString.substr(0, isoString.length - 1);
	}
	return isoString;
};

module.exports = {
	toDateTimeString: toDateTimeString
};
