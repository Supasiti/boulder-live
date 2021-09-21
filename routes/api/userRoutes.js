const express = require('express');
const query = require('../../queries');
const services = require('../../services');
// const sanitize = require('../../services/sanitize');

const router = express.Router();

// api/users/

// creating an account
const createNewUser = async (req, res) => {
  try {
    const newUser = await services.user.create(req.body);
    res.json({
      user: newUser,
      message: 'You are now logged in!',
    });
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
    res.json({
      user: rawUser,
      message: 'You are now logged in!',
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await query.getAll('User');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// requests

router.post('/signup', createNewUser);
router.post('/login', checkLogin);
router.get('/', getAllUsers);

module.exports = router;
