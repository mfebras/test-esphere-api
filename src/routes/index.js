const express = require('express');
const swaggerUi = require('swagger-ui-express');
const v1 = require('./v1');
const { definitions, options } = require('../docs');
const { dateFormat } = require('../utils');

const router = express.Router()

router.get('/', (_req, res) => {
  const data = {
    app_name: process.env.APP_NAME,
    time_zone: process.env.TZ,
    date: dateFormat(),
  }

  res.json(data);
});

router.use('/', v1);

// Render Swagger in dev only
if (process.env.APP_ENV == 'development') {
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(definitions, options))
  router.get('/docs.json', (_req, res) => res.json(definitions));
}

module.exports = router;
