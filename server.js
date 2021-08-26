const sequelize = require('./src/configs/sequelizeConnection');

// need to init all the tables to use sync (forced : true)
require('./src/models'); 

const app = require('./app');
const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }) // connect all the table to db
  .then(() => {
    server.listen(PORT, () => {
      console.log(`listening on localhost:${PORT}`);
    });
  });
