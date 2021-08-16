const User = require('../models/User');

// by id
// return 
//  - User (cleaned up or not)
const byId = async (id, cleaned=true) => {
  const user = await User.findByPk(id);
  if (!user || !cleaned) return user;
  return User.parse(user);
}

// by email
// return 
//  - User

const byEmail = async (email, cleaned=true) => {
  const user = await User.findOne({where : {email: email}});
  if (!user || !cleaned) return user;
  return User.parse(user);
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