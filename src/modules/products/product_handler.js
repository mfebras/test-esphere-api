const lang = require('../../lang');
const repository = require('./product_repository');
const {
  dateFormat,
  fail,
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

exports.detail = async (req, res) => {
  const data = await repository.find(req.params.id);

  if (!data) {
    return fail(res, lang('not.found'), 404);
  }

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

exports.update = async (req, res) => {
  const data = await repository.find(req.params.id);

  if (!data) {
    return fail(res, lang('not.found'), 404);
  }

  const payload = {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    updated_at: dateFormat(),
  };
  await repository.update(req.params.id, payload);

  return success(res, lang('success'));
}

exports.destroy = async (req, res) => {
  const data = await repository.find(req.params.id);

  if (!data) {
    return fail(res, lang('not.found'), 404);
  }

  await repository.destroy(req.params.id);

  return success(res, lang('success'));
}
