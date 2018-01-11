const viewHistory = require('../database/queries/viewHistory');

exports.post = (req, res) => {
  const userId = req.body.id;
  viewHistory(userId, (dataBaseConnectionError, viewHistoryResult) => {
    if (dataBaseConnectionError) return res.status(500).send({ error: dataBaseConnectionError });
    else if (viewHistoryResult.rowCount === 0) {
      return res.send({ responseText: 'There Is No History' });
    }
    return res.send(viewHistoryResult.rows);
  });
};
