module.exports = {
  createHeader: (req, res, data, statusCode) => {
    let isCss = req.url.slice(-3);
    res.writeHead(statusCode, {
      'Content-Type': `text/${isCss === 'css' ? 'css' : 'html'}`,
      'Content-Length': `${data.length}`
    });
    res.write(data);
  }
};
