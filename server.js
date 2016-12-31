const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

let clientRequestPath;

const server = http.createServer((req, res) => {

  // if (req.method === 'GET' && req.url === '/' || req.url === '/index.html'){
  //   clientRequestPath =  './public/index.html';
  // } else if (req.method === 'GET' && req.url === '/helium.html'){
  //   clientRequestPath =  './public/helium.html';
  // } else if (req.method === 'GET' && req.url === '/hydrogen.html') {
  //   clientRequestPath =  './public/hydrogen.html';
  // } else if (req.method === 'GET' && req.url === '/css/styles.css') {
  //   clientRequestPath =  './public/css/styles.css';
  // }


  if (req.method === 'POST'){
    req.on('data', (data) => {
      console.log(querystring.parse(data.toString()));
    })
  }



  // fs.readFile(clientRequestPath, (err, file) => {
  //   if (err) throw err;
  //   res.write(file);
  //   res.end();
  // });

});

server.listen(8080,() => {
  console.log('opened server on', server.address());
});