const errorMiddlware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    error: err.message,
    stack: err.stack,
  });
};

module.exports = errorMiddlware;
