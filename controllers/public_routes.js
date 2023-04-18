const router = require('express').Router();

// Render the Homepage view
router.get('/', (req, res) => {
  res.render('index');
});

// Render the Login Page view
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Render the Register Page view
router.get('/register', (req, res) => {
  res.render('auth/register');
});

module.exports = router;