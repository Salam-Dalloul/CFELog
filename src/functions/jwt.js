const jwt = require('jsonwebtoken');

const createToken = (payload, cb) => {
  jwt.sign(payload, process.env.SECRET, (errCreatingToken, token) => {
    if (errCreatingToken) {
      return cb(errCreatingToken);
    }
    return cb(null, token);
  });
};

const verifyToken = (token, cb) => {
  jwt.verify(token, process.env.SECRET, (errVerifingToken, decoded) => {
    if (errVerifingToken) {
      return cb(errVerifingToken);
    }
    return cb(null, decoded);
  });
};

module.exports = {
  createToken,
  verifyToken,
};
