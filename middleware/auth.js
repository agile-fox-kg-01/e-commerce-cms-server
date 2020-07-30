const { verifyToken } = require('../helper/jwt.js')
const { User } = require('../models/index.js')

async function authentication(req, res, next) {
    let token = req.headers.access_token
    
    if (token) {
        try {
            let payload = verifyToken(token)

            let currentUser = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (currentUser) {
                req.currentUser = currentUser
                next();
            } else {
                throw { name: "Unauthorized" }
            }

        } catch (err) {
            next(err)
        }

    } else {
        next ({ name: "Unauthorized" })
    }
}

async function authorization(req, res, next) {
    let currentUser = req.currentUser
    try {
        if (currentUser.role == 'admin') {
            next()
        } else {
            throw { name: "Forbidden" }
        }

    } catch (err) {
        next(err)
    }
}

module.exports = {
    authentication,
    authorization
}