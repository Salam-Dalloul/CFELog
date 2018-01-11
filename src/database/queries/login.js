const dbConnection = require('../dbConnection');


const login = (userObject, cb) => {
  const sql = {
    text: 'select * from users where username = $1',
    values: [userObject.username],
  };
  dbConnection.query(sql, (dataBaseConnectionError, userArray) => {
    if (dataBaseConnectionError) return cb(dataBaseConnectionError);
    else if (userArray.rowCount === 0) return cb(null, 'User Not Found');
    return cb(null, userArray.rows);
  });
};

module.exports = login;
