const express = require('express');
const throttle = require('../middlewares/throttle');
const router = express.Router();

const auth = require('../modules/auth');
const products = require('../modules/products');

const PREFIX = '/api/v1';

router.use(`${PREFIX}/auth`, throttle(3), auth);
router.use(`${PREFIX}/products`, throttle(), products);

module.exports = router;
