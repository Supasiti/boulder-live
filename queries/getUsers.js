const models = require('../models');

const getUsers = () => models.User.find({});

module.exports = getUsers;
