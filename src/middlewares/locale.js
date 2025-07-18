const i18n = require('i18n');

/*
 * Set default language from query string
 */
module.exports = (req, _res, next) => {
  const languages = ['id'];
  const locale = languages.includes(req.query.lang)
    ? req.query.lang
    : process.env.LANGUAGE;

  i18n.setLocale(locale);

  next();
}
