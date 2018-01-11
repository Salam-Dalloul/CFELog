const deleteMember = require('../database/queries/deleteMember');

exports.post = (req, res) => {
  const memberId = req.body.id;
  deleteMember(memberId, (dataBaseConnectionError, deletedMember) => {
    if (dataBaseConnectionError) return res.status(500).send({ error: dataBaseConnectionError });
    else if (deletedMember.error === 'Deleting History Failed' || deletedMember.error === 'Deleting Member Failed') {
      return res.send({ responseText: deletedMember.error });
    }
    return res.send({ responseText: 'Deleted Successfully' });
  });
};
