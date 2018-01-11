const getAllMembers = require('../database/queries/getAllMembers');

exports.get = (req, res) => {
  getAllMembers((dataBaseConnectionError, membersArray) => {
    if (dataBaseConnectionError) return res.status(500).send({ error: dataBaseConnectionError });
    else if (membersArray.length === 0) {
      return res.send({ responseText: 'Report Empty' });
    }
    return res.render('report', { style: 'report', member: membersArray, membersCount: membersArray.length });
  });
};
