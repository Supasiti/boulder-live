const { User } = require('../models');
const withoutProperty = require('../utils/objectUtils');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUser = async (newUser) => {

  const {username, email, password} = newUser;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const userData = await User.create({
    username,
    email,
    password: encryptedPassword
  });

  const result = withoutProperty(userData.get({ plain :true }),'password')
  return result;
} 

module.exports = registerUser;