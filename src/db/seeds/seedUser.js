const models = require('../../models');

const data = [
  {
    username : "Mary",
    email : "Mary@email.com",
    password : "$2b$10$4LiORsbGa6fIlCEWYMYwIeP5Y3ZhUiK/O4isbN8xZXFBHsIUgeKj2"
  },
  {
    username : "Bezalel",
    email : "Bezalel@email.com",
    password : "$2b$10$4LiORsbGa6fIlCEWYMYwIeP5Y3ZhUiK/O4isbN8xZXFBHsIUgeKj2"
  },
  {
    username : "Kyoichi",
    email : "Kyoichi@email.com",
    password : "$2b$10$4LiORsbGa6fIlCEWYMYwIeP5Y3ZhUiK/O4isbN8xZXFBHsIUgeKj2"
  },
  {
    username : "Saniya",
    email : "Saniya@email.com",
    password : "$2b$10$4LiORsbGa6fIlCEWYMYwIeP5Y3ZhUiK/O4isbN8xZXFBHsIUgeKj2"
  },
  {
    username : "Patricio",
    email : "Patricio@email.com",
    password : "$2b$10$4LiORsbGa6fIlCEWYMYwIeP5Y3ZhUiK/O4isbN8xZXFBHsIUgeKj2"
  },
  {
    username : "Eberhardt",
    email : "Eberhardt@email.com",
    password : "$2b$10$4LiORsbGa6fIlCEWYMYwIeP5Y3ZhUiK/O4isbN8xZXFBHsIUgeKj2"
  },
  {
    username : "Parto",
    email : "Parto@email.com",
    password : "$2b$10$4LiORsbGa6fIlCEWYMYwIeP5Y3ZhUiK/O4isbN8xZXFBHsIUgeKj2"
  },
  {
    username : "Chirstian",
    email : "Chirstian@email.com",
    password : "$2b$10$4LiORsbGa6fIlCEWYMYwIeP5Y3ZhUiK/O4isbN8xZXFBHsIUgeKj2"
  }
]

const seedUser = () => models.User.bulkCreate(data);

module.exports = seedUser;