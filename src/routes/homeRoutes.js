const router = require('express').Router();
// const withAuth = require('../../utils/auth');
// const sanitize = require('../services/sanitize');


// route:  /

// homepage
// TODO : if already login --> kick to dashboard
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      pageTitle: 'Boulder Live'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// signup page
router.get('/signup', (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect('/dashboard');
  //   return;
  // }
  res.render('signup', {
    pageTitle: 'Boulder Live',
  });
});

module.exports = router;