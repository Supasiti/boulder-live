const User = require('../models/User');
const bcrypt = require('bcrypt');


const authenticateUser = (userInput) => {
  //  find a user data with the same email

  const {email, password} = userInput;
  const userData = await User.findOne({ where: { email: email } });
  
  //  if it couldn't find user with that email
  if (!userData) {
    return {
      status: 404,
      body: { message: 'Login failed. Please try again!' }
    }
  }

  const validPassword = await bcrypt.compare(password, userData.password );

  // if it is incorrect
  if (!validPassword) {
    return {
      status: 404,
      body: { message: 'Login failed. Please try again!' }
    };
  }
  // otherwise accept login
  return {
    status: 200,
    body : { message: 'You are now logged in!' }
  }
}


module.exports = authenticateUser;