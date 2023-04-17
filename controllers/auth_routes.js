const router = require('express').Router();

router.post('/login', (req, res) => {
  const user_data = req.body;

  req.session.user = user_data.email;
  req.session.save(() => {
    res.redirect('/');
  });
});

module.exports = router;