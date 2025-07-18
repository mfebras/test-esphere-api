/* eslint-disable sonarjs/no-duplicate-string */

module.exports = {
  cors_options: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  request_limit_size: '1mb',
  strong_password: { // Validator
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    returnScore: false,
  }
}
