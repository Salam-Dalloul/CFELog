const handlers = require('./handlers');
const checkPoint = require('./checkPoint');

const router = (req, res) => {
  const endpoint = req.url;
  if (endpoint === '/') {
    checkPoint(req, res, handlers.homePage);
  } else if (endpoint.startsWith('/public/')) {
    handlers.generic(req, res);
  } else if (endpoint === '/add-member-area') {
    checkPoint(req, res, handlers.addMemberPage);
  } else if (endpoint === '/report') {
    checkPoint(req, res, handlers.reportPage);
  } else if (endpoint === '/add-member' && req.method === 'POST') {
    checkPoint(req, res, handlers.addNewMember);
  } else if (endpoint === '/get-data') {
    checkPoint(req, res, handlers.getMembersData);
  } else if (endpoint === '/public-info') {
    handlers.publicInfo(req, res);
  } else if (endpoint === '/update-member') {
    checkPoint(req, res, handlers.updateMember);
  } else if (endpoint === '/delete-member') {
    checkPoint(req, res, handlers.deleteMember);
  } else if (endpoint === '/login') {
    handlers.login(req, res);
  } else if (endpoint === '/add-new-user-area') {
    checkPoint(req, res, handlers.addNewUserPage);
  } else if (endpoint === '/add-new-user') {
    checkPoint(req, res, handlers.addNewUser);
  } else if (endpoint === '/logout') {
    handlers.logout(req, res);
  } else if (endpoint === '/get-member-history') {
    handlers.getMemberHistory(req, res);
  } else {
    handlers.err404(req, res);
  }
};

module.exports = router;
