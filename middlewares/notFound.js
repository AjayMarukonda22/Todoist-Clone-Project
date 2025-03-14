const urlNotFoundErrorHandler = (req, res, next) => {
    let err = new Error('Route not found or Invalid Url');
    err.status = 404;
    next(err);
}

module.exports = urlNotFoundErrorHandler;