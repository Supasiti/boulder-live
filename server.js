const app = require('./src/app');
const http = require('http');
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
});