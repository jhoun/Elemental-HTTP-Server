module.exports = {
  createHeader: (req, res, data, statusCode) => {
    let isCss = req.url.slice(-3);
    res.writeHead(statusCode, {
      'Content-Type': `text/${isCss === 'css' ? 'css' : 'html'}`,
      'Content-Length': `${data.length}`
    });
    res.write(data);
  },

  createHtmlElementTemplate: (data) => {
    return`
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
  },

  createHtmlListTemplate: (directoryArr ) =>  {
    return directoryArr
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
  },

  cutOrderedList: (indexFile) => {
    return indexFile.toString().slice(
      indexFile.indexOf('<ol>') + 4,
      indexFile.indexOf('</ol>')
    );
  }
};
