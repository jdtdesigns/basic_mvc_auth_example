const router = require('express').Router();

router.get('/', (req, res) => {

  res.render('index', { user: req.session.user });
});

module.exports = router;