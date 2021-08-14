const user = require('../models/user');
const withoutProperty = require('../utils/objectUtils');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerUser = async (newUser) => {

  const {username, email, password} = newUser;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const userData = await user.create({
    username,
    email,
    password: encryptedPassword
  });
  const result = withoutProperty(userData,'password')
  return result;
} 


module.exports = registerUser;