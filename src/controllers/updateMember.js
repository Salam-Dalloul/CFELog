const insertMemberHistory = require('../database/queries/insertMemberHistory');
const updateMember = require('../database/queries/updateMember');

exports.post = (req, res) => {
  const personObj = req.body;
  insertMemberHistory(personObj, (dataBaseConnectionError, newMemberHistory) => {
    if (dataBaseConnectionError) return res.status(500).send({ error: dataBaseConnectionError });
    else if (newMemberHistory.rowCount !== 1) {
      return res.send({ responseText: 'Error Inserting History' });
    }
    updateMember(personObj, (dataBaseConnectionErrorUpdatingMember, updateResult) => {
      if (dataBaseConnectionErrorUpdatingMember) return res.status(500).send({ error: dataBaseConnectionErrorUpdatingMember });
      else if (updateResult.rowCount !== 1) {
        return res.send({ responseText: 'Error updating Member' });
      }
      return res.send({ responseText: 'Updated Successfully' });
    });
    return null;
  });
};
