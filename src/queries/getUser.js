const User = require('../models/User');

// by id
// return 
//  - User
const byId = async (id) => {
  return await User.findByPk(id);
}

// by email
// return 
//  - User

const byEmail = async (email) => {
  return await User.findOne({where : {email: email}});
}

// all users
// return 
//  - Array<User>

const all = async () => {
  return await User.findAll();
}

module.exports = {
  all,
  byId,
  byEmail
}