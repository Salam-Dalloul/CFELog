const dbConnection = require('../dbConnection');

const updateMember = (personObj, cb) => {
  const updateMemberQuery = {
    text: 'UPDATE members SET name=$1, phone=$2, cwb=$3, cwa=$4, fccb=$5, fcca=$6, notes=$7 WHERE id = $8',
    values: [personObj.name, personObj.phone, personObj.cwb, personObj.cwa, personObj.fccb, personObj.fcca, personObj.notes, personObj.id],
  };
  dbConnection.query(updateMemberQuery, (dataBaseConnectionError, updateResult) => {
    if (dataBaseConnectionError) return cb(dataBaseConnectionError);
    return cb(null, updateResult);
  });
};

module.exports = updateMember;
