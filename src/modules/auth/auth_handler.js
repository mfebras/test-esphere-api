const lang = require('../../lang');
const repository = require('./auth_repository');
const {
  dateFormat,
  decrypt,
  fail,
  getToken,
  hashPassword,
  logger,
  success,
  uuid,
  validatePassword,
  verifyRefreshToken,
  USER_ROLES
} = require('../../utils');

exports.register = async (req, res) => {
  const now = dateFormat()
  const payload = {
    id: uuid(),
    name: req.body.name,
    email: req.body.email,
    role: USER_ROLES.CUSTOMER,
    password: await hashPassword(req.body.password),
    created_at: now,
    updated_at: now,
  };
  await repository.register(payload);

  return success(res, lang('success.register'));
}

exports.login = async (req, res) => {
  const user = await repository.findByEmail(req.body.email);

  if (user) {
    const isPasswordValid = await validatePassword(req.body.password, user.password);
    if (isPasswordValid) {
      user.remember_me = req.body.remember_me;
      const data = getToken(user);

      return success(res, lang('success.login'), data);
    }
  }

  return fail(res, lang('auth.credential.invalid'));
}

exports.refreshToken = async (req, res) => {
  try {
    const token = req.body.refresh_token;
    const decoded = verifyRefreshToken(token);
    const auth = decrypt(decoded.data);

    const user = await repository.findByEmail(auth.email);
    if (!user) {
      return fail(res, lang('not.found'));
    }

    user.remember_me = auth.remember_me;
    const data = getToken(user);

    return success(res, lang('success'), data);
  } catch (error) {
    logger('Refresh Token', error);
    return fail(res, lang('auth.token.invalid'));
  }
}
