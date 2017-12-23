const fs = require('fs');
const path = require('path');
const query = require('./database/dbFunctions');


const err404 = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', '404.html'), (err404Failed, file404) => {
    if (err404Failed) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>Path Not Fount.</h1>');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(file404);
    }
  });
};

const err500 = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', '500.html'), (err500Failed, file500) => {
    if (err500Failed) {
      err404(req, res);
    } else {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(file500);
    }
  });
};

const homePage = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (errIndex, fileIndex) => {
    if (errIndex) {
      err500(req, res);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fileIndex);
    }
  });
};

const generic = (req, res) => {
  fs.readFile(path.join(__dirname, '..', req.url), (errGeneric, fileGeneric) => {
    if (errGeneric) {
      err500(req, res);
    } else {
      const ext = req.url.split('.')[req.url.split('.').length - 1];
      const fileTypes = {
        js: 'application/javascript',
        html: 'text/html',
        css: 'text/css',
        jpg: 'image/jpeg',
        ico: 'image/x-icon',
        png: 'image/png',
      };
      res.writeHead(200, { 'Content-Type': fileTypes[ext] });
      res.end(fileGeneric);
    }
  });
};

const addMemberPage = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'add-member.html'), (errIndex, fileAddMember) => {
    if (errIndex) {
      err500(req, res);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fileAddMember);
    }
  });
};

const reportPage = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'report.html'), (errReport, fileReport) => {
    if (errReport) {
      err500(req, res);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fileReport);
    }
  });
};

const addNewMember = (req, res) => {
  let incomingData = '';
  req.on('data', (chunk) => {
    incomingData += chunk.toString();
  });
  req.on('end', () => {
    const personObj = JSON.parse(incomingData);
    query.addMember(personObj.name, personObj.phone, personObj.codeWarsBfr, personObj.codeWarsAft, personObj.freeCodeCampBfr, personObj.freeCodeCampAft, personObj.notes, (addError, result) => {
      if (addError) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end(`ADDING_ERROR: ${addError}`);
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('USER_ADDED');
    });
  });
};

const getMembersData = (req, res) => {
  query.getAllMembers((getAllMembersError, membersData) => {
    if (getAllMembersError) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end('SELECTING_MEMBERS_FAILED');
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end(JSON.stringify(membersData));
  });
};

const publicInfo = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'public-info.html'), (errReport, fileReport) => {
    if (errReport) {
      err500(req, res);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fileReport);
    }
  });
};

const updateMember = (req, res) => {
  let incomingData = '';
  req.on('data', (chunk) => {
    incomingData += chunk.toString();
  });
  req.on('end', () => {
    const personObj = JSON.parse(incomingData);
    query.updateMember(personObj, (updateMemberError, updateSuccessful) => {
      if (updateMemberError) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('UPDATING_MEMBER_FAILED');
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end('UPDATING_MEMBER_DONE');
    });
  });
};

const deleteMember = (req, res) => {
  let incomingData = '';
  req.on('data', (chunk) => {
    incomingData += chunk.toString();
  });
  req.on('end', () => {
    const personObj = JSON.parse(incomingData);
    query.deleteMember(personObj, (deletingMemberError, deleteSuccessful) => {
      if (deletingMemberError) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('DELETING_MEMBER_FAILED');
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end('DELETING_MEMBER_DONE');
    });
  });
};

module.exports = {
  homePage,
  generic,
  addMemberPage,
  reportPage,
  err404,
  err500,
  addNewMember,
  getMembersData,
  publicInfo,
  updateMember,
  deleteMember,
};
