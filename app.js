//  Entry point for the app
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./src/routes');
const helpers = require('./utils/helpers');
const sequelize = require('./src/configs/sequelizeConnection');
const SequelizeStore = require('connect-session-sequelize')(
  session.Store,
);

const app = express();
const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // expire after a day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

module.exports = app;
