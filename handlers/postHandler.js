const fs = require('fs').promises;
const querystring = require('querystring');
const {createHtmlElementTemplate, createHtmlListTemplate, cutOrderedList} = require('../util/helper.js');

module.exports = (req, res) => {
  req.on('data', async data => {
    data = querystring.parse(data.toString());
    const directoryArr = await fs.readdir('./public');
    if (!directoryArr.includes(`${data.elementName}.html`)) {
      await fs.writeFile(`./public/${data.elementName}.html`, createHtmlElementTemplate(data));
      res.write('Great success! You have created a new element!');
    } else {
      res.write('You already have this element.');
    }

    const directoryArrAfterAdd = await fs.readdir('./public');
    const readIndexHtml = await fs.readFile('./public/index.html');
    const newString = readIndexHtml.toString().replace(cutOrderedList(readIndexHtml), createHtmlListTemplate(directoryArrAfterAdd));
    await fs.writeFile('./public/index.html', newString);
    res.end();
  });
};
