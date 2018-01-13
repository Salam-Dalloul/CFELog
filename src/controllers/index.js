const express = require('express');
// const checkPoint = require('../mw/checkPoint.js');

const router = express.Router();
const login = require('./login');
const addUser = require('./addUser');
const addMember = require('./addMember');
const publicInfo = require('./publicInfo');
const report = require('./report');
const errors = require('./errors');
const logout = require('./logout');
const deleteMember = require('./deleteMember');
const updateMember = require('./updateMember');
const viewHistory = require('./viewHistory');

router.get('/', login.get);
router.get('/add-member-area', addMember.get);
router.get('/add-new-user-area', addUser.get);
router.get('/public-info', publicInfo.get);
router.get('/report', report.get);
router.post('/login', login.post);
router.get('/logout', logout.get);
router.post('/add-member', addMember.post);
router.post('/add-user', addUser.post);
router.post('/delete-member', deleteMember.post);
router.post('/update-member', updateMember.post);
router.post('/view-history', viewHistory.post);
router.use(errors.client);
router.use(errors.server);

module.exports = router;
