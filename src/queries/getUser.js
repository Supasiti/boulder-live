const { User } = require('../models');

// by id
// return 
//  - User
const byId = async (id) => {
  const result = await User.findByPk(id);
  return result;
}

// by email
// return 
//  - User
const byEmail = async (email) => {
  const result = await User.findOne({where : {email: email}});
  return result;
}

// all users
// return 
//  - Array<User>
const all = async () => {
  const result = await User.findAll();
  return result;
}

module.exports = {
  all,
  byId,
  byEmail
}