const dbConnection = require('../dbConnection');

const insertMemberHistory = (memberRow, cb) => {
  const historySql = {
    text: 'insert into members_history (member_id, cwb, cwa, fccb, fcca, notes) values ($1, $2, $3, $4, $5, $6)',
    values: [memberRow.id, memberRow.cwb, memberRow.cwa, memberRow.fccb, memberRow.fcca, memberRow.notes],
  };
  dbConnection.query(historySql, (dataBaseConnectionError, newMemberHistory) => {
    if (dataBaseConnectionError) return cb(dataBaseConnectionError);
    return cb(null, newMemberHistory);
  });
};

module.exports = insertMemberHistory;
