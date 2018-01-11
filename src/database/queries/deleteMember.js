const dbConnection = require('../dbConnection');

const deleteMember = (id, cb) => {
  const deleteHistory = {
    text: 'delete from members_history where member_id = $1',
    values: [id],
  };
  dbConnection.query(deleteHistory, (dataBaseConnectionErrorHistory, deletedHistoryResult) => {
    if (dataBaseConnectionErrorHistory) return cb(dataBaseConnectionErrorHistory);
    else if (deletedHistoryResult.rowCount !== 1) {
      return cb({ error: 'Deleting History Failed' });
    }
    const deletedMember = {
      text: 'delete from members where id = $1;',
      values: [id],
    };
    dbConnection.query(deletedMember, (dataBaseConnectionErrorDeleting, deleteMemberResult) => {
      if (dataBaseConnectionErrorHistory) return cb(dataBaseConnectionErrorDeleting);
      else if (deleteMemberResult.rowCount !== 1) {
        return cb({ error: 'Deleting Member Failed' });
      }
      return cb(null, deleteMemberResult);
    });
    return null;
  });
};


module.exports = deleteMember;
