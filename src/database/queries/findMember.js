const dbConnection = require('../dbConnection');


const findMember = (memberPhoneNum, cb) => {
  const sql = {
    text: 'select id from members where phone = $1',
    values: [memberPhoneNum],
  };
  dbConnection.query(sql, (dataBaseConnectionError, memberArray) => {
    if (dataBaseConnectionError) return cb(dataBaseConnectionError);
    else if (memberArray.rowCount === 0) return cb(null, 'Member Not Found');
    return cb(null, memberArray.rows);
  });
};

module.exports = findMember;
