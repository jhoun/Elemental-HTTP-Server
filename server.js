const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const PORT = 8081;
const getHandler = require('./handlers/getHandler');

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      getHandler(req, res);
      break;
  }

  // checks to see if we have the file in our directory
  //   fs.readFile(`./public${req.url}`, () => {
  //     if (req.method === 'POST') {
  //       console.log('this file does not exists, so we are gonna make one');

  //       // client POST request
  //       req.on('data', data => {
  //         let clientHeader = querystring.parse(data.toString());
  //         let clientHeaderName = clientHeader.elementName;
  //         let htmlTemplate = `<html lang="en">
  // <head>
  //   <meta charset="UTF-8">
  //   <title>The Elements - ${clientHeaderName}</title>
  //   <link rel="stylesheet" href="/css/styles.css">
  // </head>
  // <body>
  //   <h1>${clientHeaderName}</h1>
  //   <h2>${clientHeader.elementSymbol}</h2>
  //   <h3>Atomic number: ${clientHeader.elementAtomicNumber}</h3>
  //   <p>${clientHeader.elementDescription}</p>
  //   <p><a href="/">back</a></p>
  // </body>
  // </html>`;
  //         console.log('client wants: ', clientHeaderName);

  //         //creates the requested file and html input
  //         fs.writeFile(`./public/${clientHeaderName}.html`, htmlTemplate, err => {
  //           if (err) throw err;
  //           //creates new path
  //           clientRequestPath = `./public/${clientHeaderName}.html`;
  //           console.log("It's saved!");
  //           //reads it back out to client
  //           fs.readFile(clientRequestPath, (err, file) => {
  //             if (err) throw err;
  //             res.writeHead(200, { 'Content-Type': 'application/json' });
  //             res.write(`{ "success" : true }`);
  //             res.end();
  //           });
  //         });
  //       });
  //     }
  //   });
});

server.listen(PORT, () => {
  console.log('Opened server on', server.address());
});
