const dbConnection = require('../dbConnection');

const insertMemberHistory = (memberRow, cb) => {
  const dateObj = new Date();
  const dateNow = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
  const historySql = {
    text: 'insert into members_history (member_id, cwb, cwa, fccb, fcca, notes, date) values ($1, $2, $3, $4, $5, $6, $7)',
    values: [memberRow.id, memberRow.cwb, memberRow.cwa, memberRow.fccb, memberRow.fcca, memberRow.notes, dateNow],
  };
  dbConnection.query(historySql, (dataBaseConnectionError, newMemberHistory) => {
    if (dataBaseConnectionError) return cb(dataBaseConnectionError);
    else if (newMemberHistory.rowCount !== 1) return cb('Error Inserting Member History');
    return cb(null, newMemberHistory);
  });
};

module.exports = insertMemberHistory;
