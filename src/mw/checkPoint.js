const jwt = require('../functions/jwt');

module.exports = (req, res, next) => {
  if (req.headers.cookie) {
    const cookieArray = req.headers.cookie.split('; ');
    if (cookieArray.includes('logged_in=true')) {
      cookieArray.forEach((cookie, index) => {
        if (cookie.startsWith('token=')) {
          const token = cookieArray[index].replace(/token=/, '');
          jwt.verifyToken(token, (errVerifingToken, decodedToken) => {
            if (errVerifingToken) {
              res.setHeader('Set-Cookie', ['logged_in=; Max-Age=0', 'token=;Max-Age=0']);
              return res.redirect('/');
            }
            if (req.url === '/') {
              return res.redirect('/report');
            }
            req.decodedToken = decodedToken;
            return next();
          });
        }
      });
    } else {
      return res.redirect('/');
    }
  } else if (req.url === '/') {
    return next();
  }
  return res.redirect('/');
};
