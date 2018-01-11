const bcryptjs = require('bcryptjs');

const hashPassword = (pwd, cb) => {
  bcryptjs.genSalt(10, (errorHashing, salt) => {
    if (errorHashing) {
      return cb(errorHashing);
    }
    bcryptjs.hash(pwd, salt, (errHashingWithSalt, hash) => {
      if (errHashingWithSalt) {
        return cb(errHashingWithSalt);
      }
      return cb(null, hash);
    });
    return null;
  });
};

const comparePasswords = (password, hashedPassword, cb) => {
  bcryptjs.compare(password, hashedPassword, (errorComparing, passOrNot) => {
    if (errorComparing) {
      return cb(errorComparing);
    }
    return cb(null, passOrNot);
  });
};

module.exports = { comparePasswords, hashPassword };
