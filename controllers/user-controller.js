const { User } = require('../models/index');
const { comparePassword } = require('../helpers/bcryptjs');
const { signToken } = require('../helpers/jwt');


class UserController {
    static async postUserRootHandler(req, res, next) {
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
            
        }
    }
}

module.exports = UserController;