const dbConnection = require('../dbConnection');

const addNewUser = (userObject, cb) => {
  const sql = {
    text: 'insert into users (username, password, role) values ($1, $2, $3)',
    values: [userObject.username, userObject.password, userObject.role],
  };
  dbConnection.query(sql, (dataBaseConnectionError, userObject) => {
    if (dataBaseConnectionError) return cb(dataBaseConnectionError);
    return cb(null, userObject);
  });
};

module.exports = addNewUser;
