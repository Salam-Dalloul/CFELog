const dbConnection = require('../dbConnection');

const viewHistory = (memberId, cb) => {
  const viewHistoryQuery = {
    text: 'select * from members_history where member_id = $1',
    values: [memberId],
  };
  dbConnection.query(viewHistoryQuery, (dataBaseConnectionError, viewHistoryResult) => {
    if (dataBaseConnectionError) return cb(dataBaseConnectionError);
    return cb(null, viewHistoryResult);
  });
};

module.exports = viewHistory;
