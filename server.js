const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const PORT = 8080;

const server = http.createServer((req, res) => {
  let fileType;
  let findCss = req.url.split('').splice(-3, 3).join('');


const cssCheck = () => {
  if(findCss === 'css'){
    fileType = 'css';
    return fileType;
  } else  {
    fileType = 'html';
    return fileType;
  }
};

const forwardSlashCheck = () => {
  fs.readFile('./public/index.html', (err, file) => {
    if (err) throw err;
    res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': `${file.length}`});
    res.write(file);
    res.end()
  });
};


// checks to see if we have the file in our directory
  fs.readFile(`./public${req.url}`, () => {
    if (req.url === "/"){
      forwardSlashCheck();
    } else if (req.method === 'POST') {
      console.log('this file does not exists, so we are gonna make one =)');

      // client POST request
      req.on('data', (data) => {
      let clientHeader = querystring.parse(data.toString());
      let clientHeaderName = clientHeader.elementName;
      let htmlTemplate = `<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${clientHeaderName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${clientHeaderName}</h1>
  <h2>${clientHeader.elementSymbol}</h2>
  <h3>Atomic number: ${clientHeader.elementAtomicNumber}</h3>
  <p>${clientHeader.elementDescription}</p>
  <p><a href="/">back</a></p>
</body>
</html>`
      console.log('client wants: ',clientHeaderName);

      //creates the requested file and html input
      fs.writeFile(`./public/${clientHeaderName}.html`, htmlTemplate, (err) => {
          if (err) throw err;
          //creates new path
          clientRequestPath =  `./public/${clientHeaderName}.html`;
          console.log('It\'s saved!');
          //reads it back out to client
            fs.readFile(clientRequestPath, (err, file) => {
              if (err) throw err;
              res.writeHead(200, {'Content-Type' : 'application/json'});
              res.write(`{ "success" : true }`);
              res.end();
            });
        });
      });
    } else {
      //checks to see if we have this file
      fs.readFile(`./public${req.url}`, (err, file) => {
      if (req.url === "/"){
        forwardSlashCheck();
      } else if (err) {
        fs.readFile('./public/404.html', (err, file) => {
          if (err) throw err;
          res.writeHead(404, {
          'Content-Type': 'text/html',
          'Content-Length': `${file.length}`});
          res.write(file);
          res.end()
        });
        //if we do have the file, write it back to client
        } else {
          fs.readFile(`./public${req.url}`, (err, file) => {
            if (err) throw err;
            res.writeHead(200, {
            'Content-Type': `text/${cssCheck()}`,
            'Content-Length': `${file.length}`});
            res.write(file);
            res.end();
          });
        }
      });
    }
  });
});

server.listen(PORT, () => {
  console.log('opened server on', server.address());
});

