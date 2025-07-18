const lang = require('../../lang');
const repository = require('./product_repository');
const {
  dateFormat,
  success,
} = require('../../utils');

exports.index = async (req, res) => {
  const {
    limit,
    page,
    sort,
    order
  } = req.query;

  const data = await repository.paginate(limit, page, sort, order);

  return success(res, lang('success'), data);
}

exports.store = async (req, res) => {
  const now = dateFormat();
  const payload = {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    created_at: now,
    updated_at: now,
  };
  await repository.store(payload);

  return success(res, lang('success'));
}
