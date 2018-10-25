const http = require('http');
const fs = require('fs').promises;
const querystring = require('querystring');
const PORT = 8081;
const getHandler = require('./handlers/getHandler');

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      getHandler(req, res);
      break;
    case 'POST':
      req.on('data', async data => {
        data = querystring.parse(data.toString());
        const directoryArr = await fs.readdir('./public');
        if (!directoryArr.includes(`${data.elementName}.html`)) {
          let htmlElementTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${data.elementName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${data.elementName}</h1>
  <h2>${data.elementSymbol}</h2>
  <h3>Atomic number: ${data.elementAtomicNumber}</h3>
  <p>${data.elementDescription}</p>
<p><a href="/">back</a></p>
</body>
</html>`;

          await fs.writeFile(
            `./public/${data.elementName}.html`,
            htmlElementTemplate
          );
          res.write('Great success! You have created a new element!');
        } else {
          res.write('You already have this element.');
        }
        res.end();
      });
      break;
  }
});

server.listen(PORT, () => {
  console.log('Opened server on', server.address());
});
