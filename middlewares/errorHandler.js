const errorHandler = (err, req, res, next) => {
    if(err.name === 'SequelizeValidationError') {
        const errors = err.errors.map((error) => ({message: error.message}));

        res.status(400).json({errors});
    } else if(err.name === 'SequelizeUniqueConstraintError') {
        const error = err.errors.map((error) => ({message: error.message}));
        
        res.status(400).json({error});
    } else if(err.name === '400 Bad Request') {
        const error = err.error;

        res.status(400).json({error});
    } else if(err.name === '401 Unauthorized') {
        const error = err.error;

        res.status(401).json({error})
    } else if(err.name === '403 Forbidden') {
        const error = err.error;

        res.status(403).json({error})
    }  else if(err.name === '404 Not Found') {
        const error = err.error;

        res.status(404).json({error});
    } else {
        res.status(500).json({error: {message: 'Internal Server Error'}})
    }
};

module.exports = {errorHandler};