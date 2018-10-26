const http = require('http');
const PORT = 8081;
const getHandler = require('./handlers/getHandler');
const postHandler = require('./handlers/postHandler');

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      getHandler(req, res);
      break;
    case 'POST':
      postHandler(req, res);
      break;
  }
});

server.listen(PORT, () => {
  console.log('Opened server on', server.address());
});
