'use strict';
const authenticator = require('authenticator');

const generateToken = () => {
  const formattedKey = authenticator.generateKey();
  const formattedToken = authenticator.generateToken(formattedKey);

  return { formattedKey, formattedToken };
}

const verifyToken = (formattedKey, formattedToken) => {
  return Boolean(authenticator.verifyToken(formattedKey, formattedToken));
}; 

module.exports = { generateToken, verifyToken } ;
