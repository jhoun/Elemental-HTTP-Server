const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req);
});

server.listen(8080,() => {
  console.log('opened server on', server.address());
});