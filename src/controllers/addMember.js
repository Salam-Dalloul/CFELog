const insertMember = require('../database/queries/insertMember');
const insertMemberHistory = require('../database/queries/insertMemberHistory');

exports.get = (req, res) => {
  res.render('addMember', { style: 'add-member' });
};

exports.post = (req, res) => {
  insertMember(req.body, (dataBaseConnectionErrorMember, memberObject) => {
    if (dataBaseConnectionErrorMember) {
      return res.status(500).send({ error: dataBaseConnectionErrorMember });
    } else if (memberObject.rowCount !== 1) {
      return res.send({ responseText: 'Insert Unsuccessful' });
    }
    insertMemberHistory(memberObject.rows[0], (dataBaseConnectionErrorHistory, newMemberHistory) => {
      if (dataBaseConnectionErrorHistory) {
        return res.status(500).send({ error: dataBaseConnectionErrorHistory });
      } else if (newMemberHistory.rowCount !== 1) {
        return res.send({ responseText: 'Insert Unsuccessful' });
      }
      return res.send({ responseText: 'Insert Successful' });
    });
    return null;
  });
};
