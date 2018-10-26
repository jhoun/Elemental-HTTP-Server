const fs = require('fs').promises;
const querystring = require('querystring');

module.exports = (req, res) => {
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

    const directoryArrAfterAdd = await fs.readdir('./public');
    let htmlListTemplate = directoryArrAfterAdd
      .map(file => {
        if (
          file.slice(-4) === 'html' &&
          file !== '404.html' &&
          file !== 'index.html'
        ) {
          return `
    <li>
      <a href="/${file}">${file.slice(0, file.indexOf('.'))}</a>
    </li>`;
        }
      })
      .join('');

    let readIndexHtml = await fs.readFile('./public/index.html');
    readIndexHtml = readIndexHtml.toString();
    let cutString = readIndexHtml.slice(
      readIndexHtml.indexOf('<ol>') + 4,
      readIndexHtml.indexOf('</ol>')
    );

    let newString = readIndexHtml.replace(cutString, htmlListTemplate);
    await fs.writeFile('./public/index.html', newString);
    res.end();
  });
};
