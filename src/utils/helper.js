const { uuidv7 } = require('uuidv7');

/**
 * Convert object values to string separate with comma
 */
exports.parseObjVal = (obj) => Object.values(obj).join(', ');

exports.uuid = () => uuidv7();
