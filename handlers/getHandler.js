const fs = require('fs').promises;
const {createHeader} = require('../util/helper.js');

module.exports = async (req, res) => {
  // Checks if you are on home route
  if (req.url === '/') {
    try {
      // Reads index.html
      const data = await fs.readFile('./public/index.html');
      helper.createHeader(req, res, data, 200);
    } catch (err) {
      console.log('err', err);
    }
  } else {
    try {
      const data = await fs.readFile(`./public/${req.url.slice(1)}`);
      createHeader(req, res, data, 200);
    } catch (err) {
      try {
        const data = await fs.readFile('./public/404.html');
        helper.createHeader(req, res, data, 404);
      } catch (err) {
        console.log('err', err);
      }
    }
  }

  res.end();
};
