const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { verify } = require('../helpers/googleOauth')

class UserController {
    static async register(req, res, next) {
        const user = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        try {
            const newUser = await User.create(user)
            res.status(201).json({
                email: newUser.email
            })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        const inputPass = req.body.password
        try {
            const user = await User.findOne({ where: {email: req.body.email} })
            const dbPass = user ? user.password : ''
            if(!user) {
                next({
                    name: 'ValidationError',
                    errors: 'invalid username or password'
                })
            } else if (!comparePassword(inputPass, dbPass)) {
                next({
                    name: 'ValidationError',
                    errors: 'invalid username or password'
                })
            } else {
                const payload = {
                    email: user.email
                }
                const token = signToken(payload)
                res.status(200).json({ 
                    token: token,
                    email: user.email,
                    role: user.role
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async oauthGoogle(req, res, next) {
        const google_token = req.headers.google_token
        try {
            const payload = await verify(google_token)
            const newPayload = {
                email: payload.email
            }
            const user = await User.findOne({where: {
                email: newPayload.email
            }})
            if (!user) {
                const newUser = {
                    email: payload.email,
                    password: process.env.DEFAULT_GOOGLEPASS,
                    role: 'customer'
                }
                await User.create(newUser)                
                const token = signToken(newPayload)
                res.status(201).json({
                    token: token,
                    email: payload.email
                })
            } else {
                const token = signToken(newPayload)
                res.status(200).json({
                    token: token,
                    email: payload.email
                })
            }
        } catch (err) {
            next(err)
        }
    }
}
module.exports = UserController