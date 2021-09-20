const models = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const create = async (user) => {
  const plaintextPassword = user.password;
  const encryptedPassword = await bcrypt.hash(
    plaintextPassword,
    saltRounds,
  );
  const preparedUser = { ...user, password: encryptedPassword };
  const result = await models.User.create(preparedUser).catch((err) =>
    console.error(err),
  );
  return result;
};

// authenticate user
// return
//   User if the user and password is valid else null
const authenticate = async (data) => {
  const user = await models.User.findOne({ email: data.email })
    .lean() /// serialize
    .catch((err) => console.error(err));
  if (!user) return null;

  const isValid = await bcrypt.compare(data.password, user.password);
  if (isValid) {
    const { password, ...result } = user;
    return result;
  }
  return null;
};

module.exports = {
  authenticate,
  create,
};
