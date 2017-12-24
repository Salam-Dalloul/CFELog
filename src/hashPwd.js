const bcrypt = require('bcryptjs');

const hashPassword = (pwd, cb) => {
  bcrypt.genSalt(10, (errorHashing, salt) => {
    bcrypt.hash(pwd, salt, (errHashingWithSalt, hash) => {
      if (errHashingWithSalt) {
        return cb(errHashingWithSalt, null);
      }
      return cb(null, hash);
    });
  });
};

const comparePasswords = (pwd, hashedPassword, cb) => {
  bcrypt.compare(pwd, hashedPassword, (errorComparing, passOrNot) => {
    if (errorComparing) {
      return cb(errorComparing, null);
    }
    return cb(null, passOrNot);
  });
};

module.exports = {
  hashPassword,
  comparePasswords,
};
