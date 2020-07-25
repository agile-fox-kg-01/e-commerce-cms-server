const jwt = require('jsonwebtoken');

function generateToken(email) {
  const token = jwt.sign(email, process.env.JWT_SECRET);
  return token
}

function decodedToken(token) {

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  return decoded

}

module.exports = {
  generateToken,
  decodedToken
}
