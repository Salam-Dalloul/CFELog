const handlers = require('./handlers');

const router = (req, res) => {
  const endpoint = req.url;
  if (endpoint === '/') {
    handlers.homePage(req, res);
  } else if (endpoint.startsWith('/public/')) {
    handlers.generic(req, res);
  } if (endpoint === '/report.html') {
    handlers.reportPage(req, res);
  } else {
    handlers.err404(req, res);
  }
};

module.exports = router;
