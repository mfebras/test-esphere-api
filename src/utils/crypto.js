const crypto = require('crypto');
const algorithm = 'aes256';
const password = process.env.CRYPTO_SECRET;
const key = crypto.scryptSync(password, 'salt', 32);
const iv = Buffer.alloc(16, 0);

exports.encrypt = (data) => {
  if (typeof data != 'string') {
    data = JSON.stringify(data);
  }

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

exports.decrypt = (encrypted) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8') + decipher.final('utf8');
  try {
    decrypted = JSON.parse(decrypted);
  } catch (error) {
    throw error;
  }

  return decrypted;
}
