const loginQuery = require('../database/queries/login');
const bcrypt = require('../functions/bcrypt');
const jwt = require('../functions/jwt');

exports.get = (req, res) => {
  res.render('login', { layout: false, style: 'login' });
};

exports.post = (req, res) => {
  loginQuery({ username: req.body.username }, (dataBaseConnectionError, userArray) => {
    if (dataBaseConnectionError) return (res.status(500).send({ error: dataBaseConnectionError }));
    else if (userArray === 'User Not Found') return res.send({ responseText: 'Authintication Error' });
    const plainPWD = req.body.password;
    const hashedPWD = userArray[0].password;
    bcrypt.comparePasswords(plainPWD, hashedPWD, (errorComparing, passOrNot) => {
      if (errorComparing) return res.status(500).send({ error: errorComparing });
      else if (!passOrNot) {
        return res.send({ responseText: 'Authintication Error' });
      }
      const payload = {
        id: userArray[0].id,
        username: userArray[0].username,
        role: userArray[0].role,
      };
      jwt.createToken(payload, (errCreatingToken, token) => {
        if (errCreatingToken) return res.status(500).send({ error: errCreatingToken });
        res.setHeader('Set-Cookie', ['logged_in=true; Max-Age=24*60*60', `token=${token}; Max-Age=24*60*60`]);
        return res.redirect('/report');
      });
      return null;
    });
    return null;
  });
};
