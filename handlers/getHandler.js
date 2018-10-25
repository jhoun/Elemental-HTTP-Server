const fs = require('fs').promises;
const helper = require('../util/helper.js');

module.exports = async function getHandler(req, res) {
  // Checks if you are on home route
  if (req.url === '/') {
    try {
      // Reads index.html
      const data = await fs.readFile('./public/index.html');
      console.log('data', data.toString());
      helper.createHeader(req, res, data, 200);
      res.write(data);
    } catch (err) {
      console.log('err', err);
    }
  } else {
    try {
      const data = await fs.readFile(`./public/${req.url.slice(1)}`);
      helper.createHeader(req, res, data, 200);
      res.write(data);
    } catch (err) {
      try {
        const data = await fs.readFile('./public/404.html');
        helper.createHeader(req, res, data, 404);
        res.write(data);
      } catch (err) {
        console.log('err', err);
      }
    }
  }

  res.end();
};
