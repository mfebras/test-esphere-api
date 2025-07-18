require('dotenv').config();

const compression = require('compression');
const cors = require('cors');
const express = require('express');
const fingerprint = require('express-fingerprint');
const helmet = require('helmet');
const config = require('./config/app');
const locale = require('./middlewares/locale');
const routes = require('./routes');
const { errorHandler } = require('./utils');

const port = process.env.APP_PORT;

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);

app.use(helmet());

app.use(compression());
app.use(fingerprint());

// Parse & limit JSON & form request size
app.use(express.json({ limit: config.request_limit_size }));
app.use(express.urlencoded({ limit: config.request_limit_size, extended: true }));

// CORS
app.use(cors(config.cors_options));

app.use(locale);
app.use('/', routes);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(port, async () => {
    console.log(`API is running on port ${port} 🚀`);
  });

  const shutdown = () => {
    server.close(async () => {
      console.log('Closing the API');
      process.exit(0);
    });
  }

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

module.exports = app;
