// Requiring necessary npm packages
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const controllers = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3000;

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const sessionConfig = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sessionConfig));

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(controllers);

// Syncing our database and logging a message to the user upon success
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
    });
});
