const uuidv4 = require('uuid').v4;

// scrub an organiser of password
const withoutPassword = (organiser) => {
  if (organiser) {
    const {password, ...userWithoutPassword} = organiser;
    return userWithoutPassword;
  }
  return undefined;
}

// create new organiser
const create = ({username, email, password}) => {
  return {
    username: username,
    email: email,
    password: password,
    id: uuidv4(),
  };
};


module.exports = {
  create,
  withoutPassword
}