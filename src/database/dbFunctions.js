// CREATE TABLE members_history (
//                         id SERIAL PRIMARY KEY,
//                         user_id INTEGER references users(id),
//                         cwb INTEGER NOT NULL,
//                         cwa INTEGER NOT NULL,
//                         fccb INTEGER NOT NULL,
//                         fcca INTEGER NOT NULL,
//                         notes VARCHAR(255)
//                         )
//                         ;
// [F2] Smart Completion: ON  [F3] Multiline: ON   (Semi-colon [;] will end

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

const updateMember = (personObj, cb) => {
  const updateMemberQuery = {
    text: 'UPDATE members SET name=$1, phone=$2, cwb=$3, cwa=$4, fccb=$5, fcca=$6, notes=$7 WHERE id = $8',
    values: [`${personObj.name}`, personObj.phone, personObj.codeWarsBfr, personObj.codeWarsAft, personObj.freeCodeCampBfr, personObj.freeCodeCampAft, `${personObj.notes}`, personObj.id],
  };
  connect.query(updateMemberQuery, (updateError, success) => {
    if (updateError) {
      console.log(updateError);
      return cb('UPDATE_FAILED', null);
    }
    return cb(null, 'UPDATE_DONE');
  });
};

const newMemberHistory = (personObj, cb) => {
  const dateChild = new Date();
  const dateToday = `${dateChild.getFullYear()}-${dateChild.getMonth()}-${dateChild.getDate()}`;
  const updateMemberQuery = {
    text: 'INSERT INTO members_history (member_id, cwb, cwa, fccb, fcca, notes, date) VALUES ($1, $2 ,$3, $4, $5, $6, $7)',
    values: [personObj.id, personObj.codeWarsBfr, personObj.codeWarsAft, personObj.freeCodeCampBfr, personObj.freeCodeCampAft, `${personObj.notes}`, `${dateToday}`],
  };
  connect.query(updateMemberQuery, (updateError, success) => {
    if (updateError) {
      console.log(updateError);
      return cb('UPDATE_FAILED', null);
    }
    return cb(null, 'UPDATE_DONE');
  });
};


const deleteMember = (personId, cb) => {
  const deleteMemberQuery = {
    text: 'DELETE FROM members WHERE id=$1',
    values: [personId],
  };
  connect.query(deleteMemberQuery, (deleteError, successDeleting) => {
    if (deleteError) {
      return cb('DELETE_FAILED', null);
    }
    return cb(null, 'DELETE_DONE');
  });
};

const addNewUser = (newUser, cb) => {
  const addUserQuery = {
    text: 'INSERT INTO users (username, password, access_token, role) VALUES ($1, $2, $3, $4)',
    values: [`${newUser.username}`, `${newUser.password}`, `${newUser.access_token}`, `${newUser.role}`],
  };

  connect.query(addUserQuery, (addNewUserError, successUserAdding) => {
    if (addNewUserError) {
      return cb(addNewUserError, null);
    }
    return cb(null, 'USER_ADDED_SUCCESSFULLY');
  });
};

const getLoginDetails = (username, cb) => {
  const findPwd = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [username],
  };
  connect.query(findPwd, (findPwdError, requiredUser) => {
    if (findPwdError) {
      return cb(findPwdError, null);
    }
    return cb(null, requiredUser.rows[0]);
  });
};

const getMemberHistory = (memberId, cb) => {
  const selectMemberHistoryQuery = {
    text: 'SELECT * FROM members_history WHERE member_id = $1',
    values: [memberId],
  };
  connect.query(selectMemberHistoryQuery, (fetchingHistoryFailed, historyArray) => {
    if (fetchingHistoryFailed) {
      return cb(fetchingHistoryFailed, null);
    }
    return cb(null, historyArray.rows);
  });
};

module.exports = {
  addMember,
  getAllMembers,
  updateMember,
  deleteMember,
  getLoginDetails,
  addNewUser,
  newMemberHistory,
  getMemberHistory,
};
