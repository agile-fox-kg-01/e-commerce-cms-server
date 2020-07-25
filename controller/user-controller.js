const { signToken, verifyToken } = require('../helper/jwt.js')
const { comparePassword } = require('../helper/bcrypt.js')
const { User } = require('../models/index.js')

class UserController {
    static async register(req, res, next) {
        let { email, password } = req.body

        try {
            let newUser = await User.create({
                email,
                password
            })

            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        let { email, password } = req.body

        try {
            let currentUser = await User.findOne({
                where: {
                    email: email,
                    password: password
                }
            })

            if (currentUser) {
                let payload = {
                    email: currentUser.email
                }
                res.status(200).json({
                    access_token: signToken(payload)})
                // if (comparePassword(password, currentUser.password)) {
                //     })
                // } else {
                //     throw { name: 'Bad Request' }
                // }
            } else {
                throw { name: 'Bad Request' }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController