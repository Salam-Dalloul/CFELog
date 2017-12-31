const jwt = require('jsonwebtoken');

const createToken = (payload, cb) => {
  jwt.sign(payload, process.env.SECRET, (errCreatingToken, token) => {
    if (errCreatingToken) {
      return cb(errCreatingToken, null);
    }
    return cb(null, token);
  });
};
module.exports = { createToken };
