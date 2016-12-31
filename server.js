const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

let clientRequestPath;

const server = http.createServer((req, res) => {

  if (req.method === 'GET' && req.url === '/' || req.url === '/index.html'){
    clientRequestPath =  './public/index.html';
    fs.readFile(clientRequestPath, (err, file) => {
    if (err) throw err;
    res.write(file);
    res.end();
  });
  } else if (req.method === 'GET' && req.url === '/helium.html'){
    clientRequestPath =  './public/helium.html';
    fs.readFile(clientRequestPath, (err, file) => {
    if (err) throw err;
    res.write(file);
    res.end();
  });
  } else if (req.method === 'GET' && req.url === '/hydrogen.html') {
    clientRequestPath =  './public/hydrogen.html';
    fs.readFile(clientRequestPath, (err, file) => {
    if (err) throw err;
    res.write(file);
    res.end();
  });
  } else if (req.method === 'GET' && req.url === '/css/styles.css') {
    clientRequestPath =  './public/css/styles.css';
     fs.readFile(clientRequestPath, (err, file) => {
    if (err) throw err;
    res.write(file);
    res.end();
  });
  } else if  (req.method === 'POST'){

    //client POST request
    req.on('data', (data) => {
      var clientHeader = querystring.parse(data.toString());
      console.log(clientHeader.elementName);

      //writes a new file
      fs.writeFile(`./public/${clientHeader.elementName}.html`, `<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - Helium</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${clientHeader.elementName}</h1>
  <h2>${clientHeader.elementSymbol}</h2>
  <h3>Atomic number ${clientHeader.elementAtomicNumber}</h3>
  <p>${clientHeader.elementDescription}</p>
  <p><a href="/">back</a></p>
</body>
</html>`, (err) => {
        if (err) throw err;
        clientRequestPath =  './public/boron.html';
        console.log('It\'s saved!');

          fs.readFile(clientRequestPath, (err, file) => {
            if (err) throw err;
            res.write(file);
            res.end();
          });
      });
    });
  }

});

server.listen(8080,() => {
  console.log('opened server on', server.address());
});