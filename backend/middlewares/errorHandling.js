function errorHandler(err, req, res, next) {
    let statusCode = 500;
    switch (true) {
        default:
            statusCode = res.statusCode;
            return res.status(statusCode).json({ message: err.message });
    }
}

module.exports = { errorHandler };

