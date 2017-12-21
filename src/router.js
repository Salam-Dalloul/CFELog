const handlers = require('./handlers');

const router = (req, res) => {
  const endpoint = req.url;
  if (endpoint === '/') {
    handlers.homePage(req, res);
  } else if (endpoint.startsWith('/public/')) {
    handlers.generic(req, res);
  } else if (endpoint === '/report') {
    handlers.reportPage(req, res);
  } else if (endpoint === '/newPerson' && req.method === 'POST') {
    handlers.addPerson(req, res);
  } else {
    handlers.err404(req, res);
  }
};

module.exports = router;
