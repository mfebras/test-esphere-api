const express = require('express');
const { index, detail, store, update, destroy } = require('./product_handler');
const { storeValidation } = require('./product_validation');

const router = express.Router();
router.get('/', index);
router.get('/:id', detail);
router.post('/', storeValidation, store);
router.put('/:id', storeValidation, update);
router.delete('/:id', destroy);

module.exports = router;
