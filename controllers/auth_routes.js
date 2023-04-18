const router = require('express').Router();
const User = require('../models/User');

// Route to receive the login form information - Triggered by the Login page form
router.post('/auth/login', async (req, res) => {
  // The form data - email, password
  const user_data = req.body;

  // Find the user by the provided email address
  const user = await User.findOne({
    where: {
      email: user_data.email
    }
  });

  // If no user object is found, we redirect them to the register page
  if (!user) return res.redirect('/register');

  // Check that the provided password matches the encrypted pass stored in the database
  const valid_pass = await user.validatePass(user_data.password);

  // If the password is not a match, we redirect them to the login page
  if (!valid_pass) return res.redirect('/login');

  // If they pass our checks, we store their user id to the session and then redirect
  // them to the dashboard
  req.session.user_id = user.id;

  res.redirect('/dashboard');
});

// Route to receive the register form information - Triggered by the Register page form
router.post('/auth/register', async (req, res) => {
  // Form data - email, password
  const user_data = req.body;

  // Try to run this code block - if any of it throws an error, the catch will trigger
  try {
    const user = await User.create(user_data);

    // Once the user is created, we store their id to the session
    // and redirect them to the protected dashboard
    req.session.user_id = user.id;
    res.redirect('/dashboard');
  } catch (err) {
    // If any error is thrown when creating the user
    // we redirect them to the login page
    res.redirect('/login');
  }
});

// Route to log a user out
router.get('/auth/logout', (req, res) => {
  // Remove all data from the session
  req.session.destroy();

  // Redirect them back to the homepage
  res.redirect('/');
});

module.exports = router;