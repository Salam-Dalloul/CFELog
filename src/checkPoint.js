module.exports = (req, res, cb) => {
  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split('; ');
    if (cookies.includes('logged_in=true')) {
      if (cookies.includes('username=admin')) {
        if (req.url === '/') {
          res.writeHead(302, { location: '/report' });
          res.end();
        }
        return cb(req, res);
      }
      res.writeHead(302, { location: '/' });
      res.end();
    } else {
      res.writeHead(302, { location: '/' });
      res.end();
    }
  } else if (req.url === '/' && !req.headers.cookie) {
    cb(req, res);
  } else {
    res.writeHead(302, { location: '/' });
    res.end();
  }
};
