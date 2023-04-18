const router = require('express').Router();
const User = require('../models/User');

function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  next();
}

router.get('/dashboard', isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.user_id);

  res.render('private/dashboard', {
    email: user.email
  });
});

module.exports = router;