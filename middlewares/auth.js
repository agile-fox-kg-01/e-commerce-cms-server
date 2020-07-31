const { decodedToken } = require('../helpers/tokenHandler.js')
const { User } = require('../models/index.js')


async function authentication(req, res, next) {
  const token = req.headers.access_token

  if (token) {
    try {
      const payload = decodedToken(token)
      const user = await User.findOne({
        where: {
          email: payload
        }
      })
      userLogin = user.id
  
      next()

    } catch (err) {
      next(err)
    }
  }
}

module.exports = authentication

