function errorHandler(err, req, res, next) {
  let statusCode = 500;
  switch (true) {
    case typeof err === 'string':
      return res.status(statusCode).json({
        message: err,
      });
    default:
      statusCode = res.statusCode;
      return res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
  }
}

module.exports = { errorHandler };
