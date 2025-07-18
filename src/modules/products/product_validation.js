const { check } = require('express-validator');
const lang = require('../../lang');
const { validatorFormat } = require('../../utils');

const requiredVal = 'validator.required';

exports.storeValidation = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage(() => lang(requiredVal, { field: 'Name' }))
    .bail()
    .isLength({ max: 255 })
    .withMessage(() => lang('validator.length.max', { field: 'Name', max: 255 })),
  check('price')
    .trim()
    .notEmpty()
    .withMessage(() => lang(requiredVal, { field: 'Price' }))
    .bail()
    .isInt({ min: 0 })
    .withMessage(() => lang('validator.number', { field: 'Price' }) + '. ' + lang('validator.min', { field: 'Price', min: 0 })),
  check('stock')
    .trim()
    .notEmpty()
    .withMessage(() => lang(requiredVal, { field: 'Stock' }))
    .bail()
    .isInt({ min: 0 })
    .withMessage(() => lang('validator.number', { field: 'Stock' }) + '. ' + lang('validator.min', { field: 'Stock', min: 0 })),
  (req, res, next) => validatorFormat(req, res, next)
]
