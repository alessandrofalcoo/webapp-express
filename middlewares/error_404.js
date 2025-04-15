const error_404 = (req, res, next) => {
    res.status(404).json({
        error: '404 Error',
        message: 'Movie not found'
    })
}

module.exports = error_404