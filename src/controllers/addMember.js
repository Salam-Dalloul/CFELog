const findMember = require('../database/queries/findMember');
const insertMember = require('../database/queries/insertMember');
const insertMemberHistory = require('../database/queries/insertMemberHistory');

exports.get = (req, res) => res.render('addMember', { style: 'add-member' });

exports.post = (req, res) => {
  const memberObj = req.body;
  findMember(memberObj.phone, (dbConnErrFindingMember, findMemberRes) => {
    if (dbConnErrFindingMember) {
      return res.status(500).send({ error: dbConnErrFindingMember });
    } else if (findMemberRes !== 'Member Not Found') {
      return res.send({ responseText: 'Member Already Exists' });
    }
    insertMember(memberObj, (dataBaseConnectionErrorMember, memberObject) => {
      if (dataBaseConnectionErrorMember) {
        return res.status(500).send({ error: dataBaseConnectionErrorMember });
      } else if (memberObject.rowCount !== 1) {
        return res.send({ responseText: 'Insert Unsuccessful' });
      }
      insertMemberHistory(memberObject.rows[0], (dbConErrInsMemberHistory, newMemberHistory) => {
        if (dbConErrInsMemberHistory) {
          return res.status(500).send({ error: dbConErrInsMemberHistory });
        } else if (newMemberHistory === 'Error Inserting Member History') {
          return res.send({ responseText: 'Insert Unsuccessful' });
        }
        return res.send({ responseText: 'Insert Successful' });
      });
    });
  });
};
