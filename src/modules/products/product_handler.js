const lang = require('../../lang');
const repository = require('./product_repository');
const {
  dateFormat,
  success,
} = require('../../utils');

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
