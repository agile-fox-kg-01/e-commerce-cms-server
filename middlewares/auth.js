const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

async function auth(req, res, next) {
    const token = req.headers.token
    if (!token) {
        res.status(401).json({
            errors: 'please login first'
        })
    } else {
        const payload = verifyToken(token)
        try {
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if (!user) {
                res.status(401).json({
                    errors: 'login first'
                })
            } else {
                req.userLogin = user
                next()
            }
        } catch (err) {
            res.status(500).json({
                errors: 'internal server errors'
            })
        }
    }
}

async function isAdmin(req, res, next) {
    try {
        if(req.userLogin.role !== 'admin') {
            res.status(401).json({
                errors: `You don't have permission to access`
            })
        } else {
            next()
        }
    } catch (err) {
        res.status(500).json({
            errors: 'Internal Server Errors'
        })
    }
}

module.exports = {
    auth, isAdmin
}