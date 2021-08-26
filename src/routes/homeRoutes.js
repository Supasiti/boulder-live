const router = require('express').Router();
// const withAuth = require('../../utils/auth');
// const sanitize = require('../services/sanitize');


// route:  /

// homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      pageTitle: 'Boulder Live',
      // loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// signup page
router.get('/signup', (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('signup', {
    pageTitle: 'Boulder Live',
    // loggedIn: req.session.logged_in,
  });
});

module.exports = router;