const DB = require('../../database');
const { TABLES } = require('../../utils');

exports.paginate = (limit = 10, page = 1, sort = 'id', order = 'DESC') => {
  const offset = (page - 1) * limit;

  return DB(TABLES.PRODUCT)
    .select('*')
    .orderBy(sort, order)
    .limit(limit)
    .offset(offset);
}

exports.find = (id) => DB(TABLES.PRODUCT).where('id', id).first();

exports.store = (payload) => DB(TABLES.PRODUCT).insert(payload);

exports.update = (id, payload) => DB(TABLES.PRODUCT).where('id', id).update(payload);

exports.destroy = (id) => DB(TABLES.PRODUCT).where('id', id).del();
