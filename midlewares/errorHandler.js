const errorHandler = (err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map(error => ({
      message: error.message
    }));
    res.status(400).json({
      errors
    })
  } else if (err.name === "Invalid email and password") {
    res.status(400).json({
      message: 'Invalid email and password'
    })
  } else if (err.name === "Not Found") {
    res.status(404).json({
      message: 'Cant update/delete, because Product not found'
    })
  } else {
    res.status(500).json({
      errors: [{ message: 'internal server error' }]
    })
  }

}
module.exports = errorHandler


