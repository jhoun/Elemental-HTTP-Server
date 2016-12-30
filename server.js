const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  fs.readFile('./public/helium.html', (err, heliumFile) => {
    if (err) throw err;
    res.write(heliumFile);
    res.end();
  });
});

server.listen(8080,() => {
  console.log('opened server on', server.address());
});