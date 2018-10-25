module.exports = {
  createHeader: (req, res, data, statusCode) => {
    let type;
    let findCss = req.url
      .split('')
      .splice(-3, 3)
      .join('');

    if (findCss === 'css') {
      type = 'css';
    } else {
      type = 'html';
    }

    res.writeHead(statusCode, {
      'Content-Type': `text/${type}`,
      'Content-Length': `${data.length}`
    });
  }
};
