const dbConnection = require('../dbConnection');

const getAllMembers = (cb) => {
  const sql = {
    text: 'select * from members',
  };
  dbConnection.query(sql, (dataBaseConnectionError, membersArray) => {
    if (dataBaseConnectionError) return cb(dataBaseConnectionError);
    return cb(null, membersArray.rows);
  });
};

module.exports = getAllMembers;
