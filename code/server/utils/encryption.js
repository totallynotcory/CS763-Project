const crypto = require('crypto'); 

const encrypt = (plainText) => {
  var cryptoCipher = crypto.createCipher('aes-128-cbc', process.env.CRYPTO_PASSWORD);
  var secretData = cryptoCipher.update(plainText, 'utf8', 'hex')
  secretData += cryptoCipher.final('hex');
  return secretData
}

const decrypt = (encryptedText) => {
  var cryptoDecipher = crypto.createDecipher('aes-128-cbc', process.env.CRYPTO_PASSWORD);
  var reveleadData = cryptoDecipher.update(encryptedText, 'hex', 'utf8')
  reveleadData += cryptoDecipher.final('utf8');
  return reveleadData;
}

module.exports = { encrypt, decrypt } ;