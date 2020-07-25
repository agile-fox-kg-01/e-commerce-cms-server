const errorhandler = (err, req, res, next) => {
    // console.log(err.name)
    if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map((error) => ({
            message: error.message
        }))
        res.status(400).json({
            errors
        })
    } else if (err.name == 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            errors: err.errors[0]
        })
    } else if (err.name == 'ValidationError') {
        return res.status(400).json({
            errors: err.errors
        })
    } else if (err.name == 'NotFound') {
        return res.status(404).json({
            errors: err.errors
        })
    } else {
        res.status(500).json({
            errors: { message: 'internal server' }
        })
    }    
}
module.exports = errorhandler