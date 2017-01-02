const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

let fileType;


const server = http.createServer((req, res) => {
  console.log(req.url);
  //removes '/' from url
  var findCss = req.url.split('').splice(-3, 3).join('');

  if(findCss === 'css'){
    fileType = 'css';
  } else  {
    fileType = 'html';
  }

// checks to see if we have the file in our directory
fs.readFile(`./public${req.url}`, (err) => {
  if (req.url === "/"){
    fs.readFile('./public/index.html', (err, file) => {
      if (err) throw err;
      res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': `${file.length}`});
      res.write(file);
      res.end()
    });
  } else if (err) {
    console.log('this file does not exists, so we are gonna make one');

    // client POST request
    req.on('data', (data) => {
    var clientHeader = querystring.parse(data.toString());
    console.log('client wants: ',clientHeader.elementName);

    //creates the requested file and html input
    fs.writeFile(`./public/${clientHeader.elementName}.html`, `<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${clientHeader.elementName}</title>
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
        //creates new path
        clientRequestPath =  `./public/${clientHeader.elementName}.html`;
        console.log('It\'s saved!');
        //reads it back out to client
          fs.readFile(clientRequestPath, (err, file) => {
            if (err) throw err;
            res.write(file);
            res.end();
          });
      });
    });
  } else {
  //checks to see if we have this file
  fs.readFile(`./public${req.url}`, (err, file) => {
    //if we don't, then throw custom error
  if (req.url === "/"){
    fs.readFile('./public/index.html', (err, file) => {
      if (err) throw err;
      res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': `${file.length}`});
      res.write(file);
      res.end()
    });
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
    } else if (file) {
      fs.readFile(`./public${req.url}`, (err, file) => {
        if (err) throw err;
        res.writeHead(200, {
        'Content-Type': `text/${fileType}`,
        'Content-Length': `${file.length}`});
        res.write(file);
        res.end();
      });
    }
  });

  }
});

});

server.listen(8080,() => {
  console.log('opened server on', server.address());
});

