const express = require('express');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const view_routes = require('./controllers/view_routes');
const auth_routes = require('./controllers/auth_routes');
const { engine } = require('express-handlebars');
const db = require('./db/connection');

const app = express();

app.use(session({
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: false
}));

app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', [view_routes, auth_routes]);

db.sync().then(() => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT))
});