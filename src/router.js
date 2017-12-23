const handlers = require('./handlers');

const router = (req, res) => {
  const endpoint = req.url;
  if (endpoint === '/') {
    handlers.homePage(req, res);
  } else if (endpoint.startsWith('/public/')) {
    handlers.generic(req, res);
  } else if (endpoint === '/add-member-area') {
    handlers.addMemberPage(req, res);
  } else if (endpoint === '/report') {
    handlers.reportPage(req, res);
  } else if (endpoint === '/add-member' && req.method === 'POST') {
    handlers.addNewMember(req, res);
  } else if (endpoint === '/get-data') {
    handlers.getMembersData(req, res);
  } else if (endpoint === '/public-info') {
    handlers.publicInfo(req, res);
  } else if (endpoint === '/update-member') {
    handlers.updateMember(req, res);
  } else if (endpoint === '/delete-member') {
    handlers.deleteMember(req, res);
  } else {
    handlers.err404(req, res);
  }
};

module.exports = router;
