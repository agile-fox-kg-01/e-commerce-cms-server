const errorhandler = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map((error) => ({
            message: error.message
        }))
        res.status(400).json({
            errors: errors[0].message
        })
    } else if (err.name == 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            errors: err.errors[0].message
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
            errors: 'oops something went wrong please contact developers ^^'
        })
    }    
}
module.exports = errorhandler