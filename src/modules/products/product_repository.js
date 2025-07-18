const DB = require('../../database');
const { TABLES } = require('../../utils');

exports.store = (payload) => DB(TABLES.PRODUCT).insert(payload);
