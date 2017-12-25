const fs = require('fs');
const path = require('path');
const query = require('./database/dbFunctions');
const bcryptFunctions = require('./hashPwd');
const token = require('./createToken');

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
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(file500);
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
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        return res.end('ADDING_ERROR_FAILED');
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('USER_ADDED');
    });
  });
};

const getMembersData = (req, res) => {
  query.getAllMembers((getAllMembersError, membersData) => {
    if (getAllMembersError) {
      res.writeHead(401, { 'Content-Type': 'text/plain' });
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
        res.writeHead(401, { 'Content-Type': 'text/plain' });
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
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        return res.end('DELETING_MEMBER_FAILED');
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end('DELETING_MEMBER_DONE');
    });
  });
};

const login = (req, res) => {
  let incomingData = '';
  req.on('data', (chunk) => {
    incomingData += chunk.toString();
  });
  req.on('end', () => {
    const loginSubject = JSON.parse(incomingData);
    query.getLoginDetails(loginSubject.username, (noSuchUser, userDetails) => {
      if (noSuchUser) {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        return res.end('noSuchUser');
      }
      bcryptFunctions.comparePasswords(loginSubject.password, userDetails.password, (errComparing, compareResult) => {
        if (errComparing) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('errComparing');
        }
        if (!compareResult) {
          res.writeHead(401, { 'Content-Type': 'text/plain' });
          return res.end('NoUserMatch');
        }
        res.setHeader('Set-Cookie', [`token=${userDetails.access_token}`, 'logged_in=true', `username=${userDetails.username}`]);
        res.setHeader('Location', '/report');
        res.writeHead(302);
        return res.end();
      });
    });
  });
};

const addNewUserPage = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'add-user.html'), (errIndex, fileAddUser) => {
    if (errIndex) {
      err500(req, res);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fileAddUser);
    }
  });
};

const addNewUser = (req, res) => {
  let incomingData = '';
  req.on('data', (chunk) => {
    incomingData += chunk.toString();
  });
  req.on('end', () => {
    // must add a condition where username exists!!
    const newUserObj = JSON.parse(incomingData);
    console.log(newUserObj);
    query.getLoginDetails(newUserObj.username, (noSuchUser, userDetails) => {
      if (noSuchUser) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('errorChekingUser');
      }
      if (!userDetails) {
        bcryptFunctions.hashPassword(newUserObj.password, (errorHashing, hashedPwd) => {
          if (errorHashing) {
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            return res.end('errorHashing');
          }
          const userPayload = {
            username: newUserObj.username,
            role: newUserObj.role,
          };
          token.createToken(userPayload, (errorCreatingToken, token) => {
            if (errorCreatingToken) {
              res.writeHead(401, { 'Content-Type': 'text/plain' });
              return res.end('errorCreatingToken');
            }
            const newUser = {
              username: newUserObj.username,
              password: hashedPwd,
              access_token: token,
              role: newUserObj.role,
            };
            query.addNewUser(newUser, (errorAddingUser, addedSuccessfully) => {
              if (errorAddingUser) {
                console.log(errorAddingUser);
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                return res.end('errorAddingUser');
              }
              res.setHeader('location', '/add-new-user-area');
              res.writeHead(302);
              return res.end();
            });
          });
        });
      } else if (userDetails) {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        return res.end('userAlreadyExists');
      }
    });
  });
};
const logout = (req, res) => {
  res.setHeader('Set-Cookie', ['token=;max-age=0', 'logged_in=;max-age=0', 'username=;max-age=0']);
  res.writeHead(302, { location: '/' });
  res.end();
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
  login,
  addNewUserPage,
  addNewUser,
  logout,
};
