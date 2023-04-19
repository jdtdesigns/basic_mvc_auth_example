require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const public_routes = require('./controllers/public_routes');
const auth_routes = require('./controllers/auth_routes');
const private_routes = require('./controllers/private_routes');
const { engine } = require('express-handlebars');
const db = require('./db/connection');

const app = express();

app.use(express.static('public'));

// Setup handlebars
app.engine('hbs', engine({
  // Enable shortname extensions - ie. index.hbs vs index.handlebars
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
// Set the views folder for all of our handlebar template files
app.set('views', './views');

// Allow the client to send through json
app.use(express.json());
// Allow the client to send through standard form data
app.use(express.urlencoded({ extended: true }));

// Setup the req.session object for our routes
app.use(session({
  // Required to be used to validate the client cookie matches the session secret
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Load all of our routes at the root
app.use('/', [public_routes, auth_routes, private_routes]);

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT))
});