const User = require('../models/User');

// by id
// return 
//  - User
const byId = async (id) => {
  const user = await User.findByPk(id);
  return user? User.parse(user): user;
}

// by email
// return 
//  - User

const byEmail = async (email) => {
  const user = await User.findOne({where : {email: email}});
  return user? User.parse(user): user;
}

// all users
// return 
//  - Array<User>

const all = async () => {
  const users = await User.findAll();
  return users.map(u => User.parse(u));
}

module.exports = {
  all,
  byId,
  byEmail
}