const lang = require('../lang');
const {
  decrypt,
  fail,
  logger,
  verifyToken,
  USER_ROLES
} = require('../utils');

module.exports = (role = USER_ROLES.CUSTOMER) => (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(' ').pop();
      const decoded = verifyToken(token);
      req.auth = decrypt(decoded.data);

      // Check user's role
      if (role === req.auth.role) {
        return next();
      }
    }
  } catch (error) {
    logger('Error Token', error);
  }
  return fail(res, lang('auth.unverify'), 401);
}
