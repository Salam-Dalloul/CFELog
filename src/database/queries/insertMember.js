const dbConnection = require('../dbConnection');

const insertMember = (memberObject, cb) => {
  const sql = {
    text: 'insert into members (name, phone, cwb, cwa, fccb, fcca, notes, gender) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *',
    values: [memberObject.name, memberObject.phone, memberObject.cwb, memberObject.cwa, memberObject.fccb, memberObject.fcca, memberObject.notes, memberObject.gender],
  };
  dbConnection.query(sql, (dataBaseConnectionError, newMemberObject) => {
    if (dataBaseConnectionError) return cb(dataBaseConnectionError);
    return cb(null, newMemberObject);
  });
};

module.exports = insertMember;
