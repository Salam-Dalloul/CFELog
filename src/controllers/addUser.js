const addUser = require('../database/queries/addUser');
const bcrypt = require('../functions/bcrypt');

exports.get = (req, res) => {
  res.render('addUser', { style: 'add-user' });
};

exports.post = (req, res) => {
  bcrypt.hashPassword(req.body.password, (err, hashedPassword) => {
    if (err) return res.status(500).send({ error: err });
    const userObject = {
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role,
    };
    addUser(userObject, (dataBaseConnectionError, userObject) => {
      if (dataBaseConnectionError) return res.status(500).send({ error: dataBaseConnectionError });
      else if (userObject.rowCount !== 1) {
        return res.send({ responseText: 'Error Inserting User' });
      }
      return res.send({ responseText: 'User Added Successfully' });
    });
  });
};
