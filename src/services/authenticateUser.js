const getUser = require('../queries/getUser');
const bcrypt = require('bcrypt');


const authenticateUser = (userInput) => {
  //  find a user data with the same email

  const {email, password} = userInput;
  const userData = await getUser.byEmail(email);
  
  //  if it couldn't find user with that email
  if (!userData) return false;

  const result = await bcrypt.compare(password, userData.password );
  return result ;
}


module.exports = authenticateUser;