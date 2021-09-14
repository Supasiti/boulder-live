const express = require('express');
const services = require('../../services');
const sanitize = require('../../services/sanitize');

const router = express.Router();

// api/users/

const saveLogin = (req, res, rawUser) => {
  const userWithPassword = sanitize(rawUser);
  const { password, ...userWithoutPassword } = userWithPassword;

  req.session.save(() => {
    req.session.user = userWithoutPassword;
    req.session.logged_in = true;

    res.json({
      user: userWithoutPassword,
      message: 'You are now logged in!',
    });
  });
};

// creating an account
const createNewUser = async (req, res) => {
  try {
    const rawUser = await services.user.create(req.body);
    saveLogin(req, res, rawUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

// checking when they log in
const checkLogin = async (req, res) => {
  try {
    const rawUser = await services.user.authenticate(req.body);
    if (!rawUser) {
      res.status(400).json({
        message: 'Incorrect email or password, please try again',
      });
      return;
    }
    saveLogin(req, res, rawUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

// log out
const logUserOut = (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const rawUsers = await services.user.getAll();
    const users = sanitize(rawUsers);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const savePurpose = async (req, res) => {
  try {
    req.session.save(() => {
      req.session.purpose = req.body.purpose;
      res.json({ message: 'Sucessfully, registered your purpose' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

// requests
router.post('/purpose', savePurpose);
router.post('/signup', createNewUser);
router.post('/login', checkLogin);
router.post('/logout', logUserOut);
router.get('/', getAllUsers);

module.exports = router;
