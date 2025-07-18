const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dateAdd } = require('./date');
const { encrypt } = require('./crypto');

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT));
  return bcrypt.hash(password, salt)
};

exports.validatePassword = (password, hash) => bcrypt.compare(password, hash);

exports.getToken = (user) => {
  // Only set a few attributes
  const tokenData = {
    id: user.id,
    email: user.email,
    role: user.role,
    remember_me: user.remember_me,
  };

  const expiresIn = 60 * 60 * process.env.JWT_EXPIRY;
  const data = encrypt(tokenData);

  const token = jwt.sign(
    { data },
    process.env.JWT_SECRET,
    { expiresIn }
  );

  const refreshToken = jwt.sign(
    { data },
    process.env.JWT_SECRET_REFRESH,
    { expiresIn: user.remember_me
      ? process.env.JWT_REFRESH_EXTENDED_EXPIRY
      : process.env.JWT_REFRESH_EXPIRY
    }
  );

  return {
    access_token: token,
    refresh_token: refreshToken,
    access_token_exp: dateAdd(expiresIn, 'second'),
    refresh_token_exp: user.remember_me
      ? dateAdd(7, 'day')
      : dateAdd(8, 'hour'),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      remember_me: user.remember_me,
    }
  };
};

exports.verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

exports.verifyRefreshToken = (token) => jwt.verify(token, process.env.JWT_SECRET_REFRESH);
