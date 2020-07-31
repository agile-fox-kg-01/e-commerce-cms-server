
function errorHandler(err, req, res, next) {
  // console.log(err);
  switch (err.name) {

    case 'SequelizeValidationError':
      const errors = err.errors.map(e => ({
        name: 'Bad Request',
        errors: e.message
      }))
      return res.status(400).json({
        errors
      })
    case 'JsonWebTokenError':
      return res.status(401).json({
        errors: [{ message: err.message }]
      })
    case 'NotFound':
      return res.status(404).json(
        err.errors
      )
    case 'NotLoginYet':
      return res.status(400).json({
        error: err.message
      })
     case 'BadRequest':
       return res.status(400).json({
         error: err.message
      })

    default:
      res.status(500).json({
        name: 'Internal Server Error',
        error: err.errors
      })
      break;
  }
}



module.exports = errorHandler