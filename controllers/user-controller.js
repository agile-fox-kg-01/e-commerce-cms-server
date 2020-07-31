const { Cart, User } = require('../models/index');
const { comparePassword } = require('../helpers/bcryptjs');
const { signToken } = require('../helpers/jwt');

class UserController {
    static async postUserLoginHandler(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            });
            
            const dataPassword = user ? user.password : '';

            if(!user) {
                next({
                    name: '400 Bad Request',
                    error: {message: 'Invalid username or password'}
                });
            } else if(!comparePassword(password, dataPassword)) {
                next({
                    name: '400 Bad Request',
                    error: {message: 'Invalid username or password'}
                });
            } else {
                const payload = {
                    email: user.email
                }

                const token = signToken(payload);
                res.status(200).json({
                    name: user.name,
                    access_token: token
                });
            }
        } catch (error) {
            next(error);
        }
    }

    static async postUserRegisterHandler(req, res, next) {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        
        try {
            const user = await User.create(newUser);

            const userCart = {
                UserId: user.id
            };
            const cart = await Cart.create(userCart);

            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;