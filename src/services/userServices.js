const models = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const create = async (user) => {
  const plaintextPassword = user.password;
  const encryptedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
  const preparedUser = {...user, password : encryptedPassword };
  const result = await models.User.create(preparedUser);
  return result;
} 

// authenticate user
// return 
//   User if the user and password is valid else null
const authenticate = async ( data ) => {
  const user = await models.User.findOne({ where : { email : data.email }});
  if ( !user ) return null;

  const result = await bcrypt.compare(data.password, user.password);
  return result? user : null;
};


// get all users
// return - Array<User>
const getAll = async () => {
  const newUsers = await models.User.findAll();
  return newUsers;
}

module.exports = {
  authenticate,
  create,
  getAll
};