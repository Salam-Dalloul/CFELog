const connect = require('./dbConnection');

const addMember = (name, phone, cwb, cwa, fccb, fcca, notes, cb) => {
  const addQuery = {
    text: 'INSERT INTO members (name, phone, cwb, cwa, fccb, fcca, notes) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    values: [`${name}`, `${phone}`, `${cwb}`, `${cwa}`, `${fccb}`, `${fcca}`, `${notes}`],
  };

  connect.query(addQuery, (addError, success) => {
    if (addError) {
      return cb(addError, null);
    }
    return cb(null, 'ADDED_SUCCESSFULLY');
  });
};

const getAllMembers = (cb) => {
  const selectMembersQuery = {
    text: 'SELECT * FROM members',
  };
  connect.query(selectMembersQuery, (selectAllMembersError, selectResult) => {
    if (selectAllMembersError) {
      return cb(selectAllMembersError, null);
    }
    return cb(null, selectResult.rows);
  });
};


module.exports = {
  addMember,
  getAllMembers,
};
