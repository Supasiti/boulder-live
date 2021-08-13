const sequelize = require('./src/configs/sequelizeConnection');
const app = require('./src/app');
const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`listening on localhost:${PORT}`);
    });
  });
