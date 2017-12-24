const bcrypt = require('bcryptjs');

const hashPassword = (pwd, cb) => {
  bcrypt.genSalt(10, (errorHashing, hashedPwd) => {
    if (errorHashing) {
      console.log(errorHashing);
      return cb(errorHashing, null);
    }
    return cb(null, hashedPwd);
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
