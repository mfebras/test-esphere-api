const DB = require('../../database');
const { TABLES, USER_ROLES } = require('../../utils');

exports.findByEmail = (email) => DB(TABLES.USER)
  .select([
    'id',
    'name',
    'email',
    'password'
  ])
  .where({ email, role: USER_ROLES.CUSTOMER })
  .whereNull('deleted_at')
  .first();

exports.register = (payload) => DB(TABLES.USER).insert(payload);
