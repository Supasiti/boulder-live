const router = require('express').Router();
const withAuth = require('../../utils/auth');
const dashboardRouter = require('./dashboardRoutes');
const eventRouter = require('./eventRoutes');

// route:  /

// /
const renderHomePage = async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/purpose');
    return;
  }
  try {
    res.render('homepage', {
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
};


// /signup 
const renderSignUpPage = (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/purpose');
    return;
  }
  res.render('signup', {
    loggedIn: req.session.logged_in
  });
};

// /purpose
const renderPurposePage = (req, res) => {
  res.render('purpose', {
    loggedIn: req.session.logged_in
  });
};

// routes
router.get('/', renderHomePage);
router.get('/signup', renderSignUpPage);
router.get('/purpose', withAuth, renderPurposePage);
router.use('/dashboard', dashboardRouter);
router.use('/events/', eventRouter)

module.exports = router;