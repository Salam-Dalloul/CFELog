const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const hbs = require('express-handlebars');
const bodyparser = require('body-parser');

const controllers = require('./controllers');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(favicon(path.join(__dirname, '..', 'public', 'img', 'favicon.ico')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.raw({ type: () => true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  defaultLayout: 'main',
}));

app.set('port', process.env.PORT || 3000);
app.use(controllers);

module.exports = app;
