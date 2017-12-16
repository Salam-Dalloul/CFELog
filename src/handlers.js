const fs = require('fs');
const path = require('path');


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

module.exports = {
  homePage,
  generic,
  reportPage,
  err404,
  err500,
};
