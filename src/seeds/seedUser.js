const models = require('../models');

const data = [
  {
    username : "Mary",
    email : "Mary@email.com",
    password : "ajfd;abj;afdb"
  },
  {
    username : "Bezalel",
    email : "Bezalel@email.com",
    password : "ajfd;abj;afdb"
  },
  {
    username : "Kyoichi",
    email : "Kyoichi@email.com",
    password : "ajfd;abj;afdb"
  },
  {
    username : "Saniya",
    email : "Saniya@email.com",
    password : "ajfd;abj;afdb"
  },
  {
    username : "Patricio",
    email : "Patricio@email.com",
    password : "ajfd;abj;afdb"
  },
  {
    username : "Eberhardt",
    email : "Eberhardt@email.com",
    password : "ajfd;abj;afdb"
  },
  {
    username : "Parto",
    email : "Parto@email.com",
    password : "ajfd;abj;afdb"
  },
  {
    username : "Chirstian",
    email : "Chirstian@email.com",
    password : "ajfd;abj;afdb"
  }
]

const seedUser = () => models.User.bulkCreate(data);

module.exports = seedUser;